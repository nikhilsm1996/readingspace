const cron = require('node-cron');
const Seats = require('../models/seat-model');
const User = require('../models/registration-model');
const Payments = require('../models/payment-model');
const Notification = require('../models/notifications-model'); // Assuming this is your notification model
const SeatVacationRequest = require('../models/seatvacation-model'); // Add your seat vacation request model
const Tier = require('../models/tier-model'); // Add Tier model
const moment = require('moment-timezone');
// Cron job to run every day at 3 PM
cron.schedule('* * * * *', async () => {
  try {
    console.log('Running overdue payments check, payment reminders, and overdue notifications...');

    const today = new Date();
    const reminderDate = new Date(today);
    reminderDate.setDate(today.getDate() + 1); // Set to 1 day from today

    // **Send payment reminders for users whose payment is due tomorrow**
    const usersForReminder = await User.find({
      role: { $ne: 'admin' }, // Exclude admins
      nextPaymentDueDate: reminderDate.toISOString().split('T')[0], // Match date part only (YYYY-MM-DD)
    });

    for (let user of usersForReminder) {
      const message = `Reminder: Your next payment is due tomorrow. Please make sure to complete the payment by ${user.nextPaymentDueDate}.`;

      // Create the reminder notification for the user
      const notification = new Notification({
        user: user._id,
        message: message,
      });

      await notification.save();

      console.log(`Payment reminder sent to ${user.email} for payment due on ${user.nextPaymentDueDate}`);
    }

    // **Send overdue notifications for users with overdue payments**
    const overduePayments = await Payments.find({
      nextPaymentDueDate: { $lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }, // 3 days ago
      paymentStatus: 'processing', // Only check payments that are pending
    });

    for (let payment of overduePayments) {
      const seat = await Seats.findById(payment.seat);
      const user = await User.findById(payment.user);

      if (seat && user) {
        // Send notification to user about overdue payment
        const userNotificationMessage = `Your payment for seat ${seat.seatNumber} is overdue. Please make the payment immediately to avoid losing your seat.`;
        const userNotification = new Notification({
          user: user._id,
          message: userNotificationMessage,
        });

        await userNotification.save();
        console.log(`Overdue payment notification sent to ${user.email}`);

        // Optionally, send notification to admins about overdue payment
        const adminUsers = await User.find({ role: 'admin' });
        for (let admin of adminUsers) {
          const adminNotificationMessage = `Payment for seat ${seat.seatNumber} assigned to ${user.email} is overdue. Please follow up with the user.`;
          const adminNotification = new Notification({
            user: admin._id,
            message: adminNotificationMessage,
          });

          await adminNotification.save();
          console.log(`Overdue payment notification sent to admin ${admin.email}`);
        }

        // Reset seat details and user assignment after overdue
        seat.status = 'vacant';
        seat.userEmail = null;
        seat.userName = null;
        seat.user = null; // Unlink the user from the seat
        await seat.save();

        user.seatAssigned = false;
        user.seat = null;
        await user.save();

        console.log(`Seat ${seat.seatNumber} has been made vacant due to unpaid payment. User ${user.email} unlinked.`);
      }
    }

    console.log('Payment reminder and overdue payment notifications completed.');


// Get the current time in UTC and format it
const localTimeZone = "Asia/Kolkata"; 
const startOfMinute = moment().tz(localTimeZone).startOf('minute').utc().toDate();
const endOfMinute = moment().tz(localTimeZone).endOf('minute').utc().toDate();


console.log("startOfMinute",startOfMinute)
console.log("endOfMinute",endOfMinute)


const vacationRequests = await SeatVacationRequest.find({
  vacationDate: { $gte: startOfMinute, $lt: endOfMinute },
  status: 'approved',
});

console.log("VR",vacationRequests)

for (const vacationRequest of vacationRequests) {
  try {
    const seat = await Seats.findById(vacationRequest.seat);
    const user = await User.findById(vacationRequest.user);
    const tier = await Tier.findById(seat.tier);

    if (seat && user && tier) {
      // Vacate the seat
      seat.status = 'vacant';
      seat.user = null;
      seat.userEmail = null;
      seat.userName = null;
      seat.price = tier.price;
      seat.deposit = tier.deposit;

      user.seatAssigned = false;
      user.seat = null;

      // Save the seat and user updates
      await Promise.all([seat.save(), user.save()]);

  
      // Notify the user
      try {
        const notification = new Notification({
          user: user._id,
          message: `Your seat vacation request for seat ${seat.seatNumber} has been processed.`,
        });
        await notification.save();
      } catch (err) {
        console.error(`Failed to create notification for user ${user._id}:`, err);
      }

      console.log(`[${new Date().toISOString()}] Processed vacation request for seat ${seat.seatNumber}`);
    } else {
      console.error('Invalid vacation request: Missing seat, user, or tier data.');
    }
  } catch (err) {
    console.error('Error processing vacation request:', err);
  }
}

console.log('Vacation request processing complete.');








  } 
  
  
  catch (error) {
    console.error('Error during payment reminder and overdue payment check:', error);
  }
});


