import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

function formatEventDate(dateString) {
  if (!dateString) return "Date unavailable";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getEventLocation(event) {
  const venue = event?._embedded?.venues?.[0];
  const city = venue?.city?.name;
  const country = venue?.country?.name;

  return [city, country].filter(Boolean).join(", ") || "Location unavailable";
}

function getEventImage(event) {
  return (
    event?.images?.find((image) => image.ratio === "16_9")?.url ||
    event?.images?.[0]?.url ||
    "https://via.placeholder.com/800x450?text=Event"
  );
}

function getEventDescription(event) {
  return (
    event?.info ||
    event?.pleaseNote ||
    "No description is available for this event."
  );
}

function App() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;

      if (!apiKey) {
        setError(
          "Ticketmaster API key is missing. Add REACT_APP_TICKETMASTER_API_KEY to your .env.local file.",
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          apikey: apiKey,
          size: "20",
          sort: "date,asc",
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`);
        }

        const data = await response.json();
        setEvents(data?._embedded?.events || []);
      } catch (requestError) {
        setEvents([]);
        setError(
          requestError.message ||
            "Something went wrong while loading events. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return events;

    return events.filter((event) => {
      const title = event.name?.toLowerCase() || "";
      const location = getEventLocation(event).toLowerCase();

      return (
        title.includes(normalizedSearch) || location.includes(normalizedSearch)
      );
    });
  }, [events, search]);

  if (selectedEvent) {
    return (
      <div className="container">
        <button
          type="button"
          onClick={() => setSelectedEvent(null)}
          className="back-btn"
        >
          ← Back to events
        </button>

        <article className="details">
          <img
            className="details-image"
            src={getEventImage(selectedEvent)}
            alt={selectedEvent.name}
          />

          <div className="details-content">
            <h1>{selectedEvent.name}</h1>
            <p>
              <strong>Date:</strong>{" "}
              {formatEventDate(selectedEvent.dates?.start?.dateTime)}
            </p>
            <p>
              <strong>Location:</strong> {getEventLocation(selectedEvent)}
            </p>
            <p className="desc">{getEventDescription(selectedEvent)}</p>

            {selectedEvent.url && (
              <a
                className="ticket-btn"
                href={selectedEvent.url}
                target="_blank"
                rel="noreferrer"
              >
                View event
              </a>
            )}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>MeetSpace</h1>
        <p className="subtitle">Discover upcoming events</p>
      </header>

      <input
        type="search"
        placeholder="Search events or locations..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search events"
      />

      {loading && (
        <div className="status" role="status">
          Loading events...
        </div>
      )}

      {!loading && error && (
        <div className="status error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filteredEvents.length === 0 && (
        <div className="status" role="status">
          No events found. Try a different search.
        </div>
      )}

      {!loading && !error && filteredEvents.length > 0 && (
        <div className="grid">
          {filteredEvents.map((event) => (
            <button
              key={event.id}
              type="button"
              className="card"
              onClick={() => setSelectedEvent(event)}
            >
              <img src={getEventImage(event)} alt="" className="card-image" />
              <div className="card-content">
                <h2>{event.name}</h2>
                <p>{formatEventDate(event.dates?.start?.dateTime)}</p>
                <span>{getEventLocation(event)}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
