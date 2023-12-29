class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        n = len(jobDifficulty)
        if n < d:
            return -1
        if n == d:
            return sum(jobDifficulty)

        # dp[j]: the minimum difficulty of the first (j+1) jobs, exactly scheduled in (i+1) days
        dp = [int(1e9)] * n
        dp[0] = jobDifficulty[0]

        # Initializing the dp array to store the maximum difficulty encountered so far
        for i in range(1, n):
            dp[i] = max(dp[i - 1], jobDifficulty[i])

        dpPrev = dp.copy()

        # Dynamic Programming to find the minimum difficulty
        for i in range(1, d):
            dp = [int(1e9)] * n
            for j in range(i, n):
                lastDayDifficulty = jobDifficulty[j]
                tmpMin = lastDayDifficulty + dpPrev[j - 1]

                # Iterate to find the minimum difficulty for the current day
                for t in range(j - 1, i - 1, -1):
                    lastDayDifficulty = max(lastDayDifficulty, jobDifficulty[t])
                    tmpMin = min(tmpMin, lastDayDifficulty + dpPrev[t - 1])

                dp[j] = tmpMin
            dpPrev = dp.copy()

        return dp[n - 1]
