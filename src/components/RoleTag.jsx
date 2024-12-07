import { getRoleColors } from '../utils/roleColors';

function RoleTag({ role }) {
  const colors = getRoleColors(role);
  
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 
      rounded-full text-xs font-medium 
      border ${colors.border}
      ${colors.bg} ${colors.text}
    `}>
      {role}
    </span>
  );
}

export default RoleTag;
