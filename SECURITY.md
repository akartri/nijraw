# Security policy

NijRAW processes local photographs, including files with potentially sensitive EXIF/GPS data. Treat parser, WASM, sandbox, dependency, and file-handling issues as security-sensitive.

If you believe you found a vulnerability, **do not post exploit details or private image files in a public issue**. Contact **contact@akartri.com** with a minimal description, affected browser/version, and reproducible details that do not disclose personal data.

The application uses a restrictive HTML Content Security Policy. Changes that allow remote resource loading, cross-origin requests, telemetry, or additional dynamic code execution require explicit privacy and security review. Do not bypass browser security prompts to troubleshoot it.

Embedded decoder components are separately maintained and may receive upstream security updates. Their generated payloads must be replaced together with corresponding source, notices and build materials.

No formal supported-version or response-time guarantee is asserted by this initial repository package.
