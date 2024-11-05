export default function Breadcrumbs({ links }) {
    return (
      <div className="text-xl light:text-white breadcrumbs">
        <ul>
          {links.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
    )
  }