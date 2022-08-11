import { writeFile } from "fs/promises"
import { Command, Option, runExit } from "clipanion"

class BasicCommand extends Command {
    outFile = Option.String("--out-file", { required: true })
    apiUrl = Option.String("--api-url", "api.example.com")
    //                 bug ^^^

    static usage = Command.Usage({
        category: `Commands`,
        description: `testing command.`,
        details: ``,
        examples: [],
    })

    async execute() {
        // just to mark it as used
        if (!this.apiUrl) {
            throw new Error("no api url")
        }

        await writeFile(this.outFile, "test")
    }
}

// bug:
await runExit(
    {
        binaryName: "cli.mjs",
    },
    BasicCommand
)
