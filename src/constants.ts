export const VERSION = '1.6.0';
export const GITHUB_REPO = 'xxomega2077xx/softdo';

export const getDownloadLink = (platform: 'windows' | 'mac' | 'linux') => {
  const baseUrl = `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}`;
  switch (platform) {
    case 'mac': return `${baseUrl}/SoftDo-${VERSION}-macOS.dmg`;
    case 'linux': return `${baseUrl}/SoftDo-${VERSION}-Linux.AppImage`;
    default: return `${baseUrl}/SoftDo-${VERSION}-Windows.exe`;
  }
};
