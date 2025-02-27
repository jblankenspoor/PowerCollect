module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'status-done': '#22c55e',
        'status-progress': '#f59e0b',
        'status-todo': '#ef4444',
        'priority-low': '#eab308',
        'priority-medium': '#f97316',
        'priority-high': '#dc2626',
      },
    },
  },
  plugins: [],
}
