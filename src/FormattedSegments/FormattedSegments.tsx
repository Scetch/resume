export interface FormattedSegment {
  style: "normal" | "bold";
  value: string;
}

export function parseFormatted(input: string): FormattedSegment[] {
  let run = "";
  let bolded = false;
  const parsed: FormattedSegment[] = [];

  for (const [index, char] of [...input].entries()) {
    if (char === "*") {
      if (run.length > 0) {
        parsed.push({
          style: bolded ? "bold" : "normal",
          value: run,
        });

        run = "";
      }

      bolded = !bolded;
      continue;
    }

    run += char;

    if (run && index === input.length - 1) {
      parsed.push({
        style: bolded ? "bold" : "normal",
        value: run,
      });

      run = "";
    }
  }

  return parsed;
}

interface FormattedSegmentsProps {
  segments: FormattedSegment[];
}

function FormattedSegments({ segments }: FormattedSegmentsProps): JSX.Element {
  return (
    <>
      {segments.map((segment, i) => {
        if (segment.style === "bold") {
          return <b key={i}>{segment.value}</b>;
        } else {
          return <>{segment.value}</>;
        }
      })}
    </>
  );
}

export default FormattedSegments;
