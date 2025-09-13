let reminders = [];
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}
function setReminder() {
  let reminderText = document.getElementById("reminderText").value;
  let time = document.getElementById("time").value;
  if (reminderText === "" || time === "" || time <= 0) {
    alert("Please enter a valid reminder and time.");
    return;
  }
  let reminder = {
    text: reminderText,
    time: new Date().getTime() + time * 60000
  };
  reminders.push(reminder);
  displayReminders();
  setTimeout(() => {
    showReminder(reminder.text);
  }, time * 60000);
  document.getElementById("reminderText").value = "";
  document.getElementById("time").value = "";
}
function displayReminders() {
  let list = document.getElementById("reminderList");
  list.innerHTML = "";
  reminders.forEach(r => {
    let li = document.createElement("li");
    let minsLeft = Math.round((r.time - new Date().getTime()) / 60000);
    li.textContent = `${r.text} - in ${minsLeft} min(s)`;
    list.appendChild(li);
  });
}
function showReminder(message) {
  document.getElementById("bellSound").play();
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("⏰ Health Reminder", {
      body: message,
      icon: "https://cdn-icons-png.flaticon.com/512/1048/1048944.png"
    });
  }
  alert("⏰ Reminder: " + message);
}
