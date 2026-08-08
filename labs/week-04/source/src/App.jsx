import { useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import RequestForm from "./components/RequestForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import RequestList from "./components/RequestList.jsx";
import { initialTasks } from "./data/initialTasks.js";

function App() {
  const [requests, setRequests] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState("all");

  const summary = {
    total: requests.length,
    pending: requests.filter((request) => request.status === "pending").length,
    "in-progress": requests.filter((request) => request.status === "in-progress").length,
    completed: requests.filter((request) => request.status === "completed").length,
  };

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((request) => request.status === statusFilter);

  function handleAddRequest(requestData) {
    const newRequest = {
      id: `REQ-${Date.now()}`,
      ...requestData,
      status: "pending",
    };

    setRequests((currentRequests) => [newRequest, ...currentRequests]);
  }

  function handleDeleteRequest(requestId) {
    setRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== requestId),
    );
  }

  return (
    <>
      <AppHeader
        title="Campus Service Request"
        subtitle="Lab 4 — React component, Props, State เเละ Events"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm onAddRequest={handleAddRequest} />
          <section className="panel">
            <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDeleteRequest}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
