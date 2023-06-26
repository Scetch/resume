import "./Header.css";
import * as types from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faSquareGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

interface NavigationProps {
  items: types.NavigationItem[];
}

function Navigation({ items }: NavigationProps) {
  const createLabel = (icon: string, label: string) => {
    const convertIcon = (icon: string) => {
      switch (icon) {
        case "pin":
          return faLocationDot;
        case "envelope":
          return faEnvelope;
        case "github":
          return faSquareGithub;
        case "linkedin":
          return faLinkedin;
        default:
          return undefined;
      }
    };

    const convertedIcon = convertIcon(icon);

    return (
      <>
        {convertedIcon && (
          <FontAwesomeIcon className="icon" icon={convertedIcon} />
        )}
        {label}
      </>
    );
  };

  return (
    <nav>
      {items.map((nav, i) => {
        return nav.href ? (
          <a key={`nav-${i}`} href={nav.href}>
            {createLabel(nav.icon, nav.label)}
          </a>
        ) : (
          <span key={`nav-${i}`}>{createLabel(nav.icon, nav.label)}</span>
        );
      })}
    </nav>
  );
}

export interface HeaderProps {
  header: types.Header;
}

function Header({ header }: HeaderProps) {
  return (
    <header id="header">
      <h1>{header.name}</h1>
      <h2>{header.subtitle}</h2>
      <Navigation items={header.nav} />
    </header>
  );
}

export default Header;
