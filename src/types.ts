export interface NavigationItem {
  label: string;
  icon: string;
  href?: string;
}

export interface Header {
  name: string;
  subtitle: string;
  nav: NavigationItem[];
}

export interface Section {
  name: string;
  items: SectionItem[];
}

export interface SectionItem {
  title: string;
  href?: string;
  subtitle?: string;
  upper?: string;
  lower?: string;
  bullets?: string[];
}

export interface Resume {
  header: Header;
  left: Section[];
  right: Section[];
}

function validateHeader(header: Header): boolean {
  return (
    !!header.name &&
    !!header.subtitle &&
    header.nav &&
    validateNavigationItem(header.nav)
  );
}

function validateNavigationItem(nav: NavigationItem[]): boolean {
  for (const item of nav) {
    if (!item.label || !item.icon) return false;
  }

  return true;
}

function validateSectionItems(sectionItems: SectionItem[]): boolean {
  for (const sectionItem of sectionItems) {
    if (!sectionItem.title) return false;
  }

  return true;
}

function validateSections(sections: Section[]): boolean {
  for (const section of sections) {
    if (
      !section.name ||
      !(section.items && validateSectionItems(section.items))
    )
      return false;
  }

  return true;
}

export function validate(resume: Resume): boolean {
  return (
    resume.header &&
    validateHeader(resume.header) &&
    resume.left &&
    validateSections(resume.left) &&
    resume.right &&
    validateSections(resume.right)
  );
}
