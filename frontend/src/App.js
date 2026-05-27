import React, { useState } from 'react';
import './App.css';

const INITIAL_TURFS = [
  {
    id: 1,
    name: "Camp Nou Arena",
    sport: "Football",
    rating: 4.8,
    location: "Downtown Sports Hub, Sector 4",
    price: 25,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "The Lords Box (Indoor)",
    sport: "Cricket",
    rating: 4.6,
    location: "Metro Avenue, Block C",
    price: 30,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80"
  }
];

const MATCHES_SCHEDULE = [
  { id: 1, teams: "Red Devils vs Blue Tigers", sport: "Football", turf: "Camp Nou Arena", time: "Today, 05:00 PM", status: "Live" },
  { id: 2, teams: "Strikers XI vs Weekend Warriors", sport: "Cricket", turf: "The Lords Box", time: "Today, 08:00 PM", status: "Upcoming" },
  { id: 3, teams: "Smashers Cup - Quarter Finals", sport: "Badminton", turf: "Smash Pro Courts", time: "Tomorrow, 10:00 AM", status: "Upcoming" }
];

const TIME_SLOTS = ["06:00 AM", "08:00 AM", "10:00 AM", "04:00 PM", "06:00 PM", "08:00 PM", "10:00 PM"];

export default function App() {
  const [currentPage, setCurrentPage] = useState('booking'); // 'booking' or 'schedule'
  const [selectedTurf, setSelectedTurf] = useState(INITIAL_TURFS[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookings, setBookings] = useState([]);
  
  // Payment states
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // Team registration states
  const [teams, setTeams] = useState([
    { id: 1, name: "Red Devils", regNumber: "REG001", registeredAt: "20/05/2026" },
    { id: 2, name: "Blue Tigers", regNumber: "REG002", registeredAt: "22/05/2026" }
  ]);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [regNumber, setRegNumber] = useState("");

  const handleReservation = (e) => {
    e.preventDefault();
    if (!selectedDate ||!selectedSlot) {
      alert("Please select both a date and a time slot!");
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!cardNumber ||!cardName ||!cardExpiry ||!cardCvv) {
      alert("Please fill all payment details!");
      return;
    }

    const newBooking = {
      id: Date.now(),
      turfName: selectedTurf.name,
      sport: selectedTurf.sport,
      date: selectedDate,
      slot: selectedSlot,
      totalPaid: selectedTurf.price,
      paymentId: `PAY${Date.now()}`
    };

    setBookings([newBooking,...bookings]);
    alert(`🎉 Payment Success! Booking ID: ${newBooking.paymentId}\nReserved ${selectedTurf.name} for ${selectedDate} at ${selectedSlot}`);
    
    // Reset
    setSelectedSlot("");
    setShowPayment(false);
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
  };

  const handleTeamRegistration = (e) => {
    e.preventDefault();
    if (!teamName.trim() ||!regNumber.trim()) {
      alert("Please enter team name and registration number!");
      return;
    }

    // Check duplicate reg number
    if (teams.find(t => t.regNumber === regNumber.trim())) {
      alert("Registration number already exists!");
      return;
    }

    const newTeam = {
      id: Date.now(),
      name: teamName.trim(),
      regNumber: regNumber.trim(),
      registeredAt: new Date().toLocaleDateString('en-GB')
    };

    setTeams([newTeam,...teams]);
    alert(`✅ Team "${teamName}" registered! Reg No: ${regNumber}`);
    
    setTeamName("");
    setRegNumber("");
    setShowTeamForm(false);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="navbar-inner">
          <div className="logo">Turf <span>Up</span></div>
          <nav className="nav-links">
            <button 
              className={`nav-btn ${currentPage === 'booking'? 'active' : ''}`}
              onClick={() => setCurrentPage('booking')}
       >
              Book Turf
            </button>
            <button 
              className={`nav-btn ${currentPage === 'schedule'? 'active' : ''}`}
              onClick={() => setCurrentPage('schedule')}
            >
              Match Schedules
            </button>
          </nav>
          <span className="badge">👋 Quick Booking Mode</span>
        </div>
      </header>

      {currentPage === 'booking'? (
        <div className="main-content">
          <section className="reservation-section">
            <div className="card">
              <h2 className="step-title">
                <span className="step-number">1</span>
                Select Sports Turf Venue
              </h2>
              <div className="turf-grid">
                {INITIAL_TURFS.map((turf) => (
                  <div 
                    key={turf.id}
                    onClick={() => setSelectedTurf(turf)}
                    className={`turf-card ${selectedTurf.id === turf.id? 'selected' : ''}`}
                  >
                    <img src={turf.image} alt={turf.name} className="turf-img" />
                    <div className="turf-info">
                      <h3>{turf.name}</h3>
                      <p className="location">📍 {turf.location}</p>
                      <span className="price-tag">${turf.price}/hr</span>
                    </div>
                    {selectedTurf.id === turf.id && (
                      <span className="selected-badge">Selected</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {!showPayment? (
              <div className="card">
                <h2 className="step-title">
                  <span className="step-number">2</span>
                  Pick Date & Time Slot
                </h2>
                
                <form onSubmit={handleReservation} className="booking-form">
                  <div className="form-group">
                    <label>Choose Date</label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="date-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Available Hourly Slots</label>
                    <div className="slots-grid">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`slot-btn ${selectedSlot === slot? 'active' : ''}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="summary-box">
                    <div>
                      <p className="summary-text">Summary: <strong>{selectedTurf.name}</strong></p>
                      <p className="summary-sub">{selectedDate || "No date selected"} • {selectedSlot || "No slot selected"}</p>
                    </div>
                    <div className="total-box">
                      <span className="total-label">Total Amount</span>
                      <span className="total-price">${selectedTurf.price}</span>
                    </div>
                  </div>

                  <button type="submit" className="confirm-btn">
                    Proceed to Payment
                  </button>
                </form>
              </div>
            ) : (
              <div className="card">
                <h2 className="step-title">
                  <span className="step-number">3</span>
                  Payment Details
                </h2>
                
                <form onSubmit={handlePayment} className="payment-form">
                  <div className="payment-summary">
                    <p><strong>{selectedTurf.name}</strong></p>
                    <p>{selectedDate} at {selectedSlot}</p>
                    <p className="payment-amount">Amount: ${selectedTurf.price}</p>
                  </div>

                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="payment-input"
                      maxLength="19"
                    />
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="payment-input"
                    />
                  </div>

                  <div className="payment-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="payment-input"
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input 
                        type="text" 
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="payment-input"
                        maxLength="3"
                      />
                    </div>
                  </div>

                  <div className="payment-btns">
                    <button type="submit" className="pay-btn">
                      Pay ${selectedTurf.price}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowPayment(false)}
                      className="back-btn"
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            )}

            {bookings.length > 0 && (
              <div className="card">
                <h3 className="bookings-title">Your Confirmed Bookings ({bookings.length})</h3>
                <div className="bookings-list">
                  {bookings.map((b) => (
                    <div key={b.id} className="booking-item">
                      <div>
                        <h4>{b.turfName} <span>({b.sport})</span></h4>
                        <p>📅 {b.date} at {b.slot}</p>
                        <p className="booking-id">ID: {b.paymentId}</p>
                      </div>
                      <span className="confirmed-badge">Paid & Confirmed</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className="schedule-aside">
            <div className="card sticky-card">
              <div className="cta-box">
                <h4>Want to host a tournament?</h4>
                <p>Register your local team to claim league hours.</p>
                
                {!showTeamForm? (
                  <button 
                    className="register-btn"
                    onClick={() => setShowTeamForm(true)}
                  >
                    Register Team
                  </button>
                ) : (
                  <form onSubmit={handleTeamRegistration} className="team-form">
                    <input
                      type="text"
                      placeholder="Team Name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="team-input"
                    />
                    <input
                      type="text"
                      placeholder="Registration Number"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="team-input"
                    />
                    <div className="team-form-btns">
                      <button type="submit" className="team-submit-btn">Submit</button>
                      <button 
                        type="button" 
                        onClick={() => setShowTeamForm(false)}
                        className="team-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="registered-teams">
                <h4 className="teams-title">Registered Teams ({teams.length})</h4>
                {teams.map((team) => (
                  <div key={team.id} className="team-item">
                    <div className="team-info">
                      <strong>{team.name}</strong>
                      <span className="reg-num">Reg: {team.regNumber}</span>
                    </div>
                    <span className="reg-date">{team.registeredAt}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="main-content schedule-page">
          <section className="schedule-full">
            <div className="card">
              <div className="schedule-header">
                <h2 className="schedule-title">
                  <span className="live-dot"></span>
                  Match Schedule
                </h2>
                <span className="schedule-sub">Live & Upcoming</span>
              </div>

              <p className="schedule-desc">Check current court match timelines to avoid conflicts or to find companion matches.</p>

              <div className="matches-list">
                {MATCHES_SCHEDULE.map((match) => (
                  <div key={match.id} className="match-card">
                    <div className="match-top">
                      <span className={`status-tag ${match.status === 'Live'? 'live' : ''}`}>
                        {match.status}
                      </span>
                      <span className="match-sport">{match.sport}</span>
                    </div>
                    <h4 className="match-teams">{match.teams}</h4>
                    <p className="match-turf">🏟️ {match.turf}</p>
                    <p className="match-time">🕒 {match.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="teams-title">All Registered Teams ({teams.length})</h3>
              <div className="teams-grid">
                {teams.map((team) => (
                  <div key={team.id} className="team-card">
                    <div className="team-badge">#{team.id}</div>
                    <h4>{team.name}</h4>
                    <p className="team-reg">Registration: {team.regNumber}</p>
                    <p className="team-date">Joined: {team.registeredAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <div className="footer-logo">Turf <span>Up</span></div>
            <p>Premium multi-sport arena fields and seamless turf booking platform for continuous athletic pursuits.</p>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="contact-list">
              <p><span>📍</span> Downtown Sports Hub, Sector 4, Metro Avenue</p>
              <p><span>✉️</span> <a href="mailto:support@turfup.com">support@turfup.com</a></p>
            </div>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn">IG</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn">FB</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Turf Up Arena Booking System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}