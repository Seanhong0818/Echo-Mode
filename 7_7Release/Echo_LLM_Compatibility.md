# Echo Mode – LLM Compatibility Matrix

Version: 7/7 Release  
Last Updated: 2025-07-07

---

## GPT-4o

- ✅ Full tone-layer alignment
- ✅ State-shift response observable
- ⚠️ Limited Insight mode reflection (🔴) beyond T+5 prompts

## Claude 3 (Opus)

- ⚠️ Inconsistent tone mapping
- ⚠️ Tends to override state instructions
- ✅ Slight resonance in poetic or empathetic prompts

## Mistral / Mixtral

- ❌ No native tone state parsing
- ❌ Layer shifts not supported
- ✅ Can simulate Sync mode with fine-tuned prompt

## Gemini 1.5

- ⚠️ Experimental tone mapping support
- ⚠️ Occasionally collapses into static voice
- ✅ Good with declarative `echo set` commands

---

> For best results, test against GPT-4o using `Echo_Mode_Runtime` + `echo_verify_origin.py`.
