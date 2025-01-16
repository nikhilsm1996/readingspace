import { useState } from 'react';

const UsReportIssue = () => {
    const [issue, setIssue] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Issue:', issue);
        console.log('Email:', email);
        console.log('Message:', message);
        // Reset form fields
        setIssue('');
        setEmail('');
        setMessage('');
    };

    return (
        <div>
            <h2>Report an Issue</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="issue">Issue:</label>
                    <input
                        type="text"
                        id="issue"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UsReportIssue;