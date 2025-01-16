import  { useState } from 'react';

const UsSwitchSeat = () => {
    const [seat, setSeat] = useState('A1');

    const handleSeatChange = (event) => {
        setSeat(event.target.value);
    };

    return (
        <div>
            <h2>Switch Seat</h2>
            <label htmlFor="seat">Choose your seat: </label>
            <select id="seat" value={seat} onChange={handleSeatChange}>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
            </select>
            <p>Current seat: {seat}</p>
        </div>
    );
};

export default UsSwitchSeat;