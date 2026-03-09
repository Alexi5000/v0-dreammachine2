import { generateText, Output } from "ai"
import { z } from "zod"

const featureSchema = z.object({
  features: z.array(
    z.object({
      title: z.string().describe("Short feature title, 2-4 words"),
      description: z.string().describe("Compelling feature description, 15-25 words"),
      highlight: z.string().describe("A key metric or standout fact, e.g. '10x Faster' or '99.9% Accuracy'"),
    })
  ),
})

export async function POST(req: Request) {
  const { serviceName, serviceDescription } = await req.json()

  const result = await generateText({
    model: "google/gemini-3-flash",
    output: Output.object({ schema: featureSchema }),
    prompt: `You are a creative copywriter for a cutting-edge AI design studio called "Nexus AI".

Generate exactly 4 compelling feature cards for the following service:

Service: ${serviceName}
Description: ${serviceDescription}

Each feature should:
- Have a catchy, professional title (2-4 words)
- Include a compelling description that highlights the AI-powered benefit (15-25 words)
- Include a standout highlight metric or fact (like "10x Faster", "Zero Learning Curve", "24/7 Support", "Unlimited Revisions")

Make them sound innovative, premium, and focused on AI capabilities. The tone should be confident and cutting-edge.`,
  })

  return Response.json(result.output)
}
