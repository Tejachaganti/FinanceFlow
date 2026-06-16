import { motion } from "framer-motion";

const SectionHeading = ({ title, subtitle, action }) => (
  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-bold text-white md:text-4xl">
        {title}
      </motion.h1>
      {subtitle ? <p className="mt-2 text-sm text-slate-300">{subtitle}</p> : null}
    </div>
    {action}
  </div>
);

export default SectionHeading;
