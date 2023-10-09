// LANGUAGE: Javascript
// AUTHOR: HARSHITHA SOLAI VARADARAJAN
// GITHUB: https://github.com/HarshithaSolai

// This program is in javascript!

function checkHacktoberfestEligibility(prAcceptedCount, prSubmissionDate) {
  const startDate = new Date('2023-09-26');
  const endDate = new Date('2023-10-31');
  const rewardStartDate = new Date('2023-10-01');
  const rewardEndDate = new Date('2023-10-31');

  if (prSubmissionDate < startDate || prSubmissionDate > endDate) {
    return "Sorry, registration is not open or has closed.";
  }

  if (prAcceptedCount === 0) {
    return "You need at least one accepted PR/MR to participate.";
  }

  if (prAcceptedCount >= 1 && prAcceptedCount <= 50000) {
    if (prSubmissionDate >= rewardStartDate && prSubmissionDate <= rewardEndDate) {
      if (prAcceptedCount >= 4) {
        return "Congratulations! You are eligible for a tree planting and a unique digital reward.";
      } else {
        return "Congratulations! You are eligible for a tree planting.";
      }
    }
  }

  return "Thanks for participating in Hacktoberfest, but you don't meet the criteria for rewards.";
}

// Example:
const prCount = 4; // Replace with the number of PRs/MRs you've had accepted
const prDate = new Date('2023-10-15'); // Replace with the submission date of your latest PR/MR

const eligibilityStatus = checkHacktoberfestEligibility(prCount, prDate);
console.log(eligibilityStatus);
