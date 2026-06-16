import { currencies } from "../../utils/constants";

const ProfileForm = ({ profile, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="glass-card grid gap-4 p-5 md:grid-cols-2">
    <input className="field" name="name" value={profile.name} onChange={onChange} placeholder="Full name" />
    <select className="field" name="currency" value={profile.currency} onChange={onChange}>
      {currencies.map((currency) => <option key={currency}>{currency}</option>)}
    </select>
    <select className="field" name="theme" value={profile.theme} onChange={onChange}>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="system">System</option>
    </select>
    <input className="field" name="monthlySavingsGoal" type="number" value={profile.monthlySavingsGoal} onChange={onChange} placeholder="Savings goal" />
    <input className="field md:col-span-2" name="avatar" type="file" accept="image/*" onChange={onChange} />
    <button type="submit" className="btn-primary w-fit">Save profile</button>
  </form>
);

export default ProfileForm;
