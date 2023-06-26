import "./Section.css";
import * as types from "../types";
import FormattedSegments, {
  parseFormatted,
} from "../FormattedSegments/FormattedSegments";

interface SectionItemProps {
  item: types.SectionItem;
}

function SectionItem({ item }: SectionItemProps) {
  return (
    <div className="grouped-content">
      <header>
        <div className="info-left">
          <h1>
            {item.href ? <a href={item.href}>{item.title}</a> : item.title}
          </h1>
          <h2>{item.subtitle}</h2>
        </div>

        <div className="info-right">
          <div className="extra">{item.upper}</div>
          <div className="extra">{item.lower}</div>
        </div>
      </header>

      {item.bullets && (
        <ul>
          {item.bullets.map((bullet, i) => {
            return (
              <li key={i}>
                <FormattedSegments segments={parseFormatted(bullet)} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export interface SectionElementProps {
  section: types.Section;
}

function SectionElement({ section }: SectionElementProps) {
  return (
    <section>
      <h1>{section.name}</h1>

      {section.items.map((item, i) => (
        <SectionItem key={`section-item-${i}`} item={item} />
      ))}
    </section>
  );
}

export default SectionElement;
