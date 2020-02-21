export const MAIN_INFO = `
  <p>Hi!</p>

  <p>This page gives you a grasp of what a coin change algorithm does.</p>

  <p><em>For more tech-savvy: coin change is calculated with account
    to minimum amount of coins to give using dynamic programming.</em></p>

  <p>There are two main modes of visualizing: <em>Normal</em> mode and <em>Simulation</em> mode.
  You chan switch the modes in the Menu.
  Also there are total of six coins by face value: 1, 2, 5, 10, 25, 50 cents.
  <em>Normal</em> mode is pretty straightforward. You set the amount of change you want
  and press <b>Get change</b> button. Algorithm calculates the optimal amount
  of each coin to give you and after that you, well, get the coins right on the screen (^__^).</p>

  <p>The <em>Simulation</em> mode is where things get interesting. The main idea is
  to simulate the normal business day of the self-checkout counter. Then you pay
  for goods, it gives you your change. Pretty simple.</p>

  <p>But there are hundreds (if not thousands) of customers per one counter.
  And for that you need a lot of coins! How much of each coin? This is what this mode does.
  You can set the amount of customers for a hypothetical business day, amount of
  each coin you load the counter with, change range, as well as which coins you DO NOT load.
  After that just press <b>Run simulation</b> and see how counter consumes
  each coin throughout a day.
  The most interesting thing is that there are two types of counters:
  the dumb one and the smart one. The former just calculates the minimum change
  for every payment and gives the coins. The latter not only does that, it also
  accounts for the amount of each coin left in the stock. The smart counter
  tries to consume each coin type evenly and not run out of change in
  the middle of a day.</p>

  <p>The default setup for Simulation is intended to show that the effectiveness
  of "smart" cachier can be quite drastic when you don't load it evenly with
  every coin.</p>
`;
