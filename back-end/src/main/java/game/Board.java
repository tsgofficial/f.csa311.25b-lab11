package game;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Board {

    private final Player[] cells;

    public Board() {
        this(IntStream.range(0, 9).mapToObj(i -> null)
                .collect(Collectors.toList()).toArray(new Player[0]));
    }

    public Board(Player[] cells) {
        this.cells = cells;
    }

    public Player getCell(int x, int y) {
        return this.cells[y * 3 + x];
    }

    public Board updateCell(int x, int y, Player player) {
        Player[] newCells = Arrays.copyOf(this.cells, this.cells.length);
        newCells[y * 3 + x] = player;
        return new Board(newCells);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int y = 0; y < 3; y++) {
            for (int x = 0; x < 3; x++) {
                Player cell = getCell(x, y);
                if (cell == null) {
                    sb.append(".");
                } else if (cell == Player.PLAYER0) {
                    sb.append("X");
                } else {
                    sb.append("O");
                }
                if (x < 2) {
                    sb.append(" ");
                }
            }
            sb.append("\n");
        }
        return sb.toString();
    }
}
