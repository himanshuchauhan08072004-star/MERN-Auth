import { getDeviceInfo } from "../utils/device.js";

const dummyRows = [
  { device: "Desktop", browser: "Chrome", os: "Windows", location: "Delhi, IN", status: "success" },
  { device: "Mobile", browser: "Safari", os: "iOS", location: "Mumbai, IN", status: "success" },
  { device: "Desktop", browser: "Firefox", os: "macOS", location: "Bengaluru, IN", status: "failed" },
];

const RecentActivityTable = () => {
  const current = getDeviceInfo();
  const rows = [
    {
      device: current.deviceType,
      browser: current.browser,
      os: current.os,
      location: "Current session",
      status: "success",
      isCurrent: true,
    },
    ...dummyRows,
  ];

  return (
    <div className="rounded-xl border border-surface-border bg-surface-light/60 overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-border">
        <h3 className="font-semibold text-text-primary">Recent Login Activity</h3>
        <p className="text-xs text-text-secondary mt-0.5">
          Sample data — device/browser detection is real, history below is illustrative
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-secondary text-xs border-b border-surface-border">
              <th className="px-5 py-2.5 font-medium">Date</th>
              <th className="px-5 py-2.5 font-medium">Device</th>
              <th className="px-5 py-2.5 font-medium">Browser</th>
              <th className="px-5 py-2.5 font-medium">OS</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
              <th className="px-5 py-2.5 font-medium">Location</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-surface-border last:border-0">
                <td className="px-5 py-3 text-text-primary">
                  {row.isCurrent ? "Just now" : `${(i + 1) * 2} days ago`}
                </td>
                <td className="px-5 py-3 text-text-secondary">{row.device}</td>
                <td className="px-5 py-3 text-text-secondary">{row.browser}</td>
                <td className="px-5 py-3 text-text-secondary">{row.os}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      row.status === "success"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {row.status === "success" ? "Success" : "Failed"}
                  </span>
                </td>
                <td className="px-5 py-3 text-text-secondary">{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;
