import React from 'react';
import { useUser } from '../../context/UserContext';

function Dashboard() {
  const {user} = useUser();
  return (
    <main className="flex-1 p-4">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6">
          <h2 className="text-3xl text-blue-900">
            Welcome <strong>{user.name}</strong>
          </h2>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
