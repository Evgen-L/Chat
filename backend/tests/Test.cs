using XUnit;

namespace Tests;

public class Tests
{
    [Fact]
    public void CheckGetConnString()
    {
        string expected = GetConnectionString();
        string actual = "Host={localhost};Username={postgres};Password={admin};Database={chat_db}";

        Assert.Equal(expected, actual);
    }
}