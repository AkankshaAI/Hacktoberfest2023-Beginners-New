class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def is_valid(row: int, col: int, num: str) -> bool:
            for i in range(9):
                if board[row][i] == num:
                    return False
            for i in range(9):
                if board[i][col] == num:
                    return False
            sub_row = (row // 3) * 3
            sub_col = (col // 3) * 3
            for i in range(sub_row, sub_row + 3):
                for j in range(sub_col, sub_col + 3):
                    if board[i][j] == num:
                        return False
            return True
        
        def backtrack() -> bool:
            for i in range(9):
                for j in range(9):
                    if board[i][j] == '.':
                        for num in ['1', '2', '3', '4', '5', '6', '7', '8', '9']:
                            if is_valid(i, j, num):
                                board[i][j] = num
                                if backtrack():
                                    return True
                                board[i][j] = '.'
                        return False
            return True
        
        backtrack()