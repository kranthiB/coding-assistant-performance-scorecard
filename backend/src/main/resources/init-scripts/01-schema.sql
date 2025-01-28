CREATE TABLE IF NOT EXISTS tools (
    id SERIAL,
    name VARCHAR(100) NOT NULL,
    score DECIMAL(5,2),
    status VARCHAR(20) NOT NULL,
    description TEXT,
    last_assessment DATE,
    category VARCHAR(50)
);

-- Insert initial data for tools
INSERT INTO tools (name, score, status, description, last_assessment, category)
VALUES
    ('GitHub Copilot', 0, 'active', 'AI-powered code completion and suggestion tool built on OpenAI Codex', '2024-01-20', 'AI Code Assistant'),
    ('Tabnine', 0, 'active', 'AI-driven code completion tool optimizing for speed and privacy.', '2024-01-15', 'AI Code Assistant'),
    ('Codeium', 0, 'active', 'Free AI-powered coding assistant with autocomplete and chat capabilities', '2024-01-18', 'AI Code Assistant'),
    ('Amazon Q Developer', 0, 'active', 'AI coding assistant integrated with AWS services for development and debugging.', '2024-01-16', 'AI Code Assistant & Cloud Integration'),
    ('Cursor', 0, 'active', 'AI-powered IDE with enhanced coding, debugging, and refactoring capabilities', '2024-01-14', 'AI Code Assistant & AI-Powered IDE'),
    ('Windsurf', 0, 'active', 'AI-driven code generation and optimization tool for software development.', '2024-01-10', 'AI Code Assistant & Code Optimization'),
    ('CodeGPT', 0, 'active', 'Open-source AI assistant for code completion and chat, based on large language models', '2024-01-12', 'AI Code Assistant & Open Source');