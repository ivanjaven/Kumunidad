export function PrintIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <rect x="6" y="13" width="12" height="8" />
      <path d="M6 18h12v4H6z" />
      <line x1="6" y1="9" x2="18" y2="9" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  )
}
