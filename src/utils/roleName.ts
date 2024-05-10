export const getRoleName = (roleId: string) => {
  switch (roleId) {
    case 'User':
      return 'Giảng viên';
    case 'Leader':
      return 'Trưởng bộ môn';
    case 'Admin':
      return 'Quản trị viên';
    default:
      return 'Người dùng';
  }
};
