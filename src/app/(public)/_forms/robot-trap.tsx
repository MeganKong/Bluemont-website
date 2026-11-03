// Owner: Nika. A hidden "Website" box that people never see or reach with the
// Tab key, but spam robots fill in. If it has anything in it, the server
// ignores the form (see isRobot in ./actions.ts).
export function RobotTrap() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
