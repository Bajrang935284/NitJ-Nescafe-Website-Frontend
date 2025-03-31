// import React, { useState, useEffect } from 'react';
// import { useCanteen } from '../../Context/CanteenSettingsContext';
// import './adminSetting.css';

// const AdminSetting = () => {
//   const { settings, updateSettings,isCanteenOpen } = useCanteen();
//   const [openTime, setOpenTime] = useState('');
//   const [closeTime, setCloseTime] = useState('');
//   const [message, setMessage] = useState('');
//   const [canteenStatus, setCanteenStatus] = useState(false);
//   // When settings load, prefill the inputs
//   useEffect(() => {
//     if (settings) {
//       setOpenTime(settings.openTime);
//       setCloseTime(settings.closeTime);

//       setCanteenStatus(isCanteenOpen());
//     }
   
//   }, [settings,isCanteenOpen]);

//   const handleUpdate = async () => {
//     try {
//       const res = await updateSettings({ openTime, closeTime });
//       setMessage(res.message || 'Settings updated successfully');
//     } catch (error) {
//       setMessage('Failed to update settings');
//     }
//   };

//   return (
//     <div className="admin-settings-container">
//       <h2>Canteen Settings</h2>
//       <div className="admin-settings-form">
//         <label>
//           Open Time (HH:MM):
//           <input
//             type="text"
//             value={openTime}
//             onChange={(e) => setOpenTime(e.target.value)}
//           />
//         </label>
//         <label>
//           Close Time (HH:MM):
//           <input
//             type="text"
//             value={closeTime}
//             onChange={(e) => setCloseTime(e.target.value)}
//           />
//         </label>
//         <button onClick={handleUpdate}>Update Settings</button>
//       </div>
//       {message && <p className="admin-settings-message">{message}</p>}
//     </div>
//   );
// };

// export default AdminSetting;


import React, { useState, useEffect } from 'react';
import { useCanteen } from '../../Context/CanteenSettingsContext';
import './adminSetting.css';

const AdminSetting = () => {
  const { settings, updateSettings, isCanteenOpen } = useCanteen();
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [message, setMessage] = useState('');
  const [canteenStatus, setCanteenStatus] = useState(false);

  // When settings load, prefill the inputs
  useEffect(() => {
    if (settings) {
      // Ensure times are set correctly from settings
      setOpenTime(settings.openTime || '');
      setCloseTime(settings.closeTime || '');
      
      // Update canteen status
      setCanteenStatus(isCanteenOpen());
    }
  }, [settings, isCanteenOpen]);

  // Validate time format before updating
  const validateTimeFormat = (time) => {
    // Regex to match HH:MM format with 24-hour time
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeFormat.test(time);
  };

  const handleUpdate = async () => {
    // Validate input times
    if (!validateTimeFormat(openTime) || !validateTimeFormat(closeTime)) {
      setMessage('Please enter times in HH:MM format (24-hour clock)');
      return;
    }

    try {
      const res = await updateSettings({ 
        openTime, 
        closeTime 
      });
      
      // Update local state after successful update
      setMessage(res.message || 'Settings updated successfully');
      setCanteenStatus(isCanteenOpen());
    } catch (error) {
      setMessage('Failed to update settings');
      console.error(error);
    }
  };

  return (
    <div className="admin-settings-container">
      <h2>Canteen Settings</h2>
      <div className="admin-settings-form">
        <label>
          Open Time (HH:MM):
          <input
            type="text"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            placeholder="e.g., 09:00"
          />
        </label>
        <label>
          Close Time (HH:MM):
          <input
            type="text"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            placeholder="e.g., 17:00"
          />
        </label>
        <button onClick={handleUpdate}>Update Settings</button>
      </div>
      {message && <p className="admin-settings-message">{message}</p>}
      <div>
        Current Canteen Status: {canteenStatus ? 'Open' : 'Closed'}
      </div>
    </div>
  );
};

export default AdminSetting;