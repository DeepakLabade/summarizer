export async function formatFileNameasTitle(fileName: string) {
    const withoutExtention = fileName.replace(/\.[^/.]+$/, '');
    const withSpaces = withoutExtention.replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')

    return withSpaces.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ').trim();
}