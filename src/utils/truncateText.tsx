import { Popover } from "antd";

export function truncateText(
  text: string | null | undefined,
  maxLength: number
) {
  if (!text) return "-";

  const isLong = text.length > maxLength;
  const shortText = isLong ? text.slice(0, maxLength) + "..." : text;

  if (!isLong) return shortText;

  return (
    <span>
      <Popover
        content={
          <div
            style={{
              maxWidth: 300,
            }}
          >
            {text}
          </div>
        }
        trigger="hover"
      >
        {shortText}
      </Popover>
    </span>
  );
}

// Usage example:
// const longText = "This is a very long text that needs to be truncated.";
// const truncated = truncateText(longText, 20);
