type UsernameExistsFn = (username: string) => Promise<boolean>;

/**
 * Generate valid and unique username suggestions.
 *
 * @param base The base username string the user attempted
 * @param count Number of valid suggestions to return
 * @param checkExists Async function to check if username exists in DB
 */
export async function generateUsernameSuggestions(
  base: string,
  count: number,
  checkExists: UsernameExistsFn
): Promise<string[]> {
  const suggestions = new Set<string>();
  const maxAttempts = 50; // prevent infinite loops

  const randomInt = () => Math.floor(Math.random() * 9999);
  const prefixes = ["the", "its", "real", "official", "hey"];
  const suffixes = ["dev", "x", "_", ".me", "_01"];

  const sanitizedBase = base.toLowerCase().replace(/[^a-z0-9]/g, "");
  const baseHasPrefix = prefixes.some((p) => sanitizedBase.startsWith(p));
  const baseHasSuffix = suffixes.some((s) => sanitizedBase.endsWith(s));

  let attempts = 0;

  while (suggestions.size < count && attempts < maxAttempts) {
    attempts++;
    const variant = Math.floor(Math.random() * 4);
    let suggestion: string;

    switch (variant) {
      case 0:
        suggestion = `${sanitizedBase}${randomInt()}`;
        break;
      case 1:
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        suggestion = baseHasSuffix ? `${sanitizedBase}${randomInt()}` : `${sanitizedBase}${suffix}`;
        break;
      case 2:
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        suggestion = baseHasPrefix ? `${sanitizedBase}${randomInt()}` : `${prefix}${sanitizedBase}`;
        break;
      case 3:
        suggestion = `${sanitizedBase}${new Date().getFullYear()}`;
        break;
      default:
        suggestion = `${sanitizedBase}${randomInt()}`;
    }

    if (!suggestions.has(suggestion) && !(await checkExists(suggestion))) {
      suggestions.add(suggestion);
    }
  }

  return Array.from(suggestions);
}
