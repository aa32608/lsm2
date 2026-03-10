// Business hours utility functions

export const getBusinessHoursStatus = (businessHours = {}) => {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes
  
  // Map days to business hours keys
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = dayKeys[currentDay];
  
  const todayHours = businessHours[todayKey];
  
  if (!todayHours || !todayHours.open || !todayHours.close) {
    return {
      isOpen: false,
      status: 'closed',
      statusText: 'Closed',
      nextOpenTime: getNextOpenTime(businessHours, currentDay, currentTime),
      color: '#ef4444' // red
    };
  }
  
  const openTime = parseTime(todayHours.open);
  const closeTime = parseTime(todayHours.close);
  
  if (currentTime >= openTime && currentTime <= closeTime) {
    return {
      isOpen: true,
      status: 'open',
      statusText: 'Open Now',
      closesAt: formatTime(closeTime),
      color: '#10b981' // green
    };
  }
  
  return {
    isOpen: false,
    status: 'closed',
    statusText: 'Closed',
    nextOpenTime: getNextOpenTime(businessHours, currentDay, currentTime),
    color: '#ef4444' // red
  };
};

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

const getNextOpenTime = (businessHours, currentDay, currentTime) => {
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  // Check remaining days this week
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDay + i) % 7;
    const nextDayKey = dayKeys[nextDayIndex];
    const nextDayHours = businessHours[nextDayKey];
    
    if (nextDayHours && nextDayHours.open) {
      const dayName = nextDayKey.charAt(0).toUpperCase() + nextDayKey.slice(1);
      return `Opens ${dayName} at ${nextDayHours.open}`;
    }
  }
  
  return 'No upcoming hours';
};

export const formatBusinessHours = (businessHours = {}) => {
  const dayKeys = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];
  
  const formatted = dayKeys.map(day => {
    const hours = businessHours[day.key];
    if (!hours || !hours.open || !hours.close) {
      return { day: day.label, hours: 'Closed' };
    }
    return { day: day.label, hours: `${hours.open} - ${hours.close}` };
  });
  
  // Group consecutive days with same hours
  const grouped = [];
  let currentGroup = { days: [formatted[0].day], hours: formatted[0].hours };
  
  for (let i = 1; i < formatted.length; i++) {
    if (formatted[i].hours === currentGroup.hours) {
      currentGroup.days.push(formatted[i].day);
    } else {
      grouped.push(currentGroup);
      currentGroup = { days: [formatted[i].day], hours: formatted[i].hours };
    }
  }
  grouped.push(currentGroup);
  
  return grouped.map(group => ({
    days: group.days.length > 1 ? `${group.days[0]} - ${group.days[group.days.length - 1]}` : group.days[0],
    hours: group.hours
  }));
};

export const BusinessHoursDisplay = ({ businessHours, compact = false }) => {
  const status = getBusinessHoursStatus(businessHours);
  
  if (compact) {
    return (
      <div className="business-hours-compact" style={{ color: status.color }}>
        <span className="business-hours-status">{status.statusText}</span>
      </div>
    );
  }
  
  return (
    <div className="business-hours-display">
      <div className="business-hours-status" style={{ color: status.color }}>
        <span className="status-indicator">●</span>
        {status.statusText}
      </div>
      {status.closesAt && (
        <div className="business-hours-closes">
          Closes at {status.closesAt}
        </div>
      )}
      {status.nextOpenTime && (
        <div className="business-hours-next">
          {status.nextOpenTime}
        </div>
      )}
    </div>
  );
};
