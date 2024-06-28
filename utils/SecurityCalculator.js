const calculateScore = async (userInfo) => {
  let newSecurityScore = userInfo.security_score;
  if (userInfo.twoFactoreIsSet === 1) {
    newSecurityScore = newSecurityScore + 5;
  }
  if (userInfo.biometricsIsSet === 1) {
    newSecurityScore = newSecurityScore + 10;
  }
  if (userInfo.notificationsActive === 1) {
    newSecurityScore = newSecurityScore + 3;
  }
  newSecurityScore = newSecurityScore + userInfo.modules_completed * 0.5;

  return newSecurityScore;
};

export default calculateScore;
