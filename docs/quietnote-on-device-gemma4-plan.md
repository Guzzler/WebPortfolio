# QuietNote On-Device Gemma 4 Plan

Date: 2026-04-02

## Scope

This repository is `WebPortfolio`, not the QuietNote application. This document captures the current feasibility assessment and an implementation plan that can be applied once work moves into the actual QuietNote codebase.

## Goal

Evaluate whether QuietNote can run the latest Gemma 4 model family fully on-device, with special attention to:

- whether `Gemma 4-E2B` is a practical target today,
- whether `MLC` is the right runtime,
- how to preserve local-only inference and avoid sending note content off device.

## Current Findings

### 1. The latest relevant model family is Gemma 4

As of 2026-04-02, Google's latest Gemma launch is Gemma 4. Google is positioning the on-device path around the Google AI Edge stack, especially LiteRT, LiteRT-LM, and higher-level inference APIs built on top of them.

### 2. MLC is not the default path for Gemma 4 on launch day

MLC's standard workflow is smooth when a model architecture is already supported. If the architecture or runtime support is missing, the work expands into compiler and model-library support, not just integration. At the time of this assessment, MLC/WebLLM's public prebuilt model lists still show Gemma 2-era support rather than a clearly documented turnkey Gemma 4 path.

Practical takeaway:

- `Gemma 4 + MLC` should be treated as an R&D track.
- `Gemma 4 + Google AI Edge / LiteRT-LM` is the lower-risk delivery path.

### 3. On-device inference can stay local, but app behavior still determines privacy

If QuietNote uses an on-device runtime correctly, prompt processing and generation can stay on the user's device. That does not automatically guarantee zero data capture overall. The app must still avoid:

- analytics on prompt or output text,
- server-side fallbacks,
- crash reports that include note content,
- background syncing of prompts, embeddings, or generated output.

## Recommendation

Build QuietNote around a provider abstraction and ship the first version against Google's on-device stack rather than MLC.

Recommended order:

1. Prove `Gemma 4-E2B` in the official on-device runtime.
2. Integrate it behind a `LocalLLMProvider` interface in QuietNote.
3. Add explicit privacy constraints and no-network handling.
4. Revisit MLC only after official Gemma 4 support becomes concrete.

## Proposed QuietNote Architecture

### Core interface

Define one application-facing interface for local inference:

- `initializeModel()`
- `downloadModel()`
- `generate(request)`
- `streamGenerate(request, onToken)`
- `cancel(requestId)`
- `getHealth()`

This keeps the UI and note workflows independent from the underlying runtime.

### Provider implementations

Start with:

- `LiteRTProvider` or `GoogleAIEdgeProvider`

Leave room for:

- `MLCProvider`
- `WebLLMProvider`
- `MockProvider` for local development and tests

### Privacy guardrails

QuietNote should explicitly enforce:

- no prompt or completion logging,
- no telemetry payloads containing note text,
- no automatic cloud fallback,
- clear first-run disclosure for model download size and storage impact,
- user-visible offline status.

## Integration Plan

### Phase 1: Feasibility spike

Success criteria:

- model downloads and initializes locally,
- note summarization works with acceptable latency,
- memory usage is stable,
- no note content leaves the device.

Work items:

1. Select one target platform first: web, desktop, Android, or iOS.
2. Run a minimal Gemma 4-E2B prompt/response loop on-device.
3. Measure startup time, first-token latency, tokens/sec, and memory usage.
4. Document model packaging and distribution constraints.

### Phase 2: QuietNote runtime integration

Work items:

1. Add a provider layer for local model execution.
2. Move generation into a worker/background thread to protect UI responsiveness.
3. Support streaming output and cancellation.
4. Add model download, readiness, and failure states.
5. Add feature flags so the local model path can be enabled gradually.

### Phase 3: Product hardening

Work items:

1. Define maximum note size and truncation strategy.
2. Add redaction-safe error handling.
3. Verify airplane-mode behavior.
4. Add regression tests around local-only execution paths.
5. Review all analytics/crash tooling for privacy leaks.

### Phase 4: Optional MLC investigation

Only start this phase if:

- MLC publicly ships Gemma 4 support, or
- we decide to invest in custom model-library or architecture support.

Questions for the MLC track:

- Is Gemma 4 already supported in `mlc-llm`?
- If not, is this a config gap or an architecture gap?
- What compile targets are needed for QuietNote's target platform?
- What model size and quantization variants are realistic for the product?

## Suggested Next Step

Move this work into the actual QuietNote repository and perform a narrow spike:

- pick one target device,
- wire one note summarization flow,
- confirm the model stays local,
- benchmark the user experience.

## Sources

- Gemma 4 launch: https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/
- Gemma 4 overview: https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/
- Gemma 3n release context: https://developers.googleblog.com/en/introducing-gemma-3n/
- LiteRT overview: https://ai.google.dev/edge/litert/overview
- MediaPipe LLM Inference: https://ai.google.dev/edge/mediapipe/solutions/genai/llm_inference
- LiteRT-LM announcement: https://developers.googleblog.com/on-device-genai-in-chrome-chromebook-plus-and-pixel-watch-with-litert-lm/
- MLC WebLLM docs: https://llm.mlc.ai/docs/deploy/webllm.html
- WebLLM config: https://github.com/mlc-ai/web-llm/blob/main/src/config.ts
