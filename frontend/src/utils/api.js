/*const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// User profile
export const fetchProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

export const updateProfile = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/user/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
};

// Campaigns
export const fetchCampaigns = async () => {
  const res = await fetch(`${API_BASE_URL}/campaigns`);
  if (!res.ok) throw new Error('Failed to fetch campaigns');
  return res.json();
};

export const fetchCampaignById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}`);
  if (!res.ok) throw new Error('Failed to fetch campaign');
  return res.json();
};

export const createCampaign = async (formData, token) => {
  const res = await fetch(`${API_BASE_URL}/campaigns`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
  if (!res.ok) throw new Error('Failed to create campaign');
  return res.json();
};

// 👇 NEW: Approve campaign
export const approveCampaign = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}/approve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to approve campaign');
  return res.json();
};

// 👇 NEW: Reject campaign
export const rejectCampaign = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to reject campaign');
  return res.json();
};

// Auth
export const register = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

// Donations
export const donate = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/donations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Donation failed');
  return res.json();
};
*/

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// User profile
export const fetchProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/user/profile`, {  // <-- changed
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

export const updateProfile = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/user/profile`, {  // <-- changed
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
};

// Campaigns
export const fetchCampaigns = async () => {
  const res = await fetch(`${API_BASE_URL}/campaigns`);
  if (!res.ok) throw new Error('Failed to fetch campaigns');
  return res.json();
};

export const fetchCampaignById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}`);
  if (!res.ok) throw new Error('Failed to fetch campaign');
  return res.json();
};

export const createCampaign = async (formData, token) => {
  const res = await fetch(`${API_BASE_URL}/campaigns`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`  // no Content-Type, because formData
    },
    body: formData
  });
  if (!res.ok) {
    const errorText = await res.text(); // capture raw backend response
    throw new Error(`Failed to create campaign: ${res.status} ${errorText}`);
  }
  return res.json();
};

// Approve / Reject (Admin)
export const approveCampaign = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}/approve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to approve campaign');
  return res.json();
};

export const rejectCampaign = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to reject campaign');
  return res.json();
};

// Auth
export const register = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

// Donations
export const donate = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/donations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Donation failed');
  return res.json();
};
