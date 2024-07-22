/*
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.loginUserResponse['currentUser'] } | undefined,
) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access?.includes('admin'),
    canUpdateNews: currentUser && currentUser.access?.includes('updateNews'),
    canAddNews: currentUser && currentUser.access?.includes('addNews'),
    canDeleteNews: currentUser && currentUser.access?.includes('deleteNews'),
  };
}
