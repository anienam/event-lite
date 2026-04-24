import React, { useState } from "react";
import "./App.css";

const eventData = [
  {
    id: 1,
    title: "Tech Conference Lagos",
    date: "May 10, 2026",
    location: "Lagos",
    description:
      "A major tech conference bringing together developers, startups, and investors across Africa.",
  },
  {
    id: 2,
    title: "Frontend Meetup",
    date: "June 5, 2026",
    location: "Abuja",
    description:
      "A meetup for frontend developers to network, learn, and share ideas.",
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    date: "July 12, 2026",
    location: "Remote",
    description:
      "Watch startups pitch their ideas to investors and industry leaders.",
  },
  {
    id: 4,
    title: "React Bootcamp",
    date: "August 20, 2026",
    location: "Port Harcourt",
    description:
      "An intensive bootcamp focused on building modern React applications.",
  },
  {
    id: 5,
    title: "AI & Web Summit",
    date: "September 2, 2026",
    location: "Lagos",
    description: "Exploring the intersection of AI and modern web development.",
  },
  {
    id: 6,
    title: "Design Systems Workshop",
    date: "September 18, 2026",
    location: "Remote",
    description: "Learn how to build scalable and reusable design systems.",
  },
  {
    id: 7,
    title: "JavaScript Deep Dive",
    date: "October 8, 2026",
    location: "Abuja",
    description: "Advanced JavaScript concepts for modern frontend developers.",
  },
  {
    id: 8,
    title: "Hackathon Africa",
    date: "October 25, 2026",
    location: "Lagos",
    description:
      "Collaborate with developers to build innovative solutions in 48 hours.",
  },
  {
    id: 9,
    title: "Product Management Meetup",
    date: "November 6, 2026",
    location: "Remote",
    description:
      "Understanding how product and engineering teams work together.",
  },
  {
    id: 10,
    title: "Web3 Builders Conference",
    date: "November 20, 2026",
    location: "Port Harcourt",
    description: "Dive into blockchain, Web3, and decentralized applications.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = eventData.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  );

  // For event selection
  if (selectedEvent) {
    return (
      <div className="container">
        <button onClick={() => setSelectedEvent(null)} className="back-btn">
          ← Back
        </button>

        <div className="details">
          <h1>{selectedEvent.title}</h1>
          <p>
            <strong>Date:</strong> {selectedEvent.date}
          </p>
          <p>
            <strong>Location:</strong> {selectedEvent.location}
          </p>
          <p className="desc">{selectedEvent.description}</p>
        </div>
      </div>
    );
  }

  // Show event list
  return (
    <div className="container">
      <h1>MeetSpace</h1>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="card"
            onClick={() => setSelectedEvent(event)}
          >
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <span>{event.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
