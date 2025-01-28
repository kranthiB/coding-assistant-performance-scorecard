-- Parent table for tools
CREATE TABLE IF NOT EXISTS tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    score DECIMAL(5,2),
    status VARCHAR(20) NOT NULL,
    description TEXT,
    last_assessment DATE,
    category VARCHAR(50)
);


-- Main assessment table (1:1 with tools)
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE
);

-- Assessment scores table (1:1 with assessments)
CREATE TABLE IF NOT EXISTS assessment_scores (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER UNIQUE NOT NULL,
    total DECIMAL(5,2),
    intelligence DECIMAL(5,2),
    acceleration DECIMAL(5,2),
    experience DECIMAL(5,2),
    value DECIMAL(5,2),
    FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
);

-- Assessment categories table (1:many with assessments)
CREATE TABLE IF NOT EXISTS assessment_categories (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    score JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_assessment_tool ON assessments(tool_id);
CREATE INDEX idx_assessment_scores ON assessment_scores(assessment_id);
CREATE INDEX idx_assessment_categories ON assessment_categories(assessment_id);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_assessments_updated_at
    BEFORE UPDATE ON assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


INSERT INTO tools (name, score, status, description, last_assessment, category)
VALUES
    ('GitHub Copilot', 0, 'active', 'AI-powered code completion and suggestion tool built on OpenAI Codex', '2024-01-20', 'AI Code Assistant'),
    ('Tabnine', 0, 'active', 'AI-driven code completion tool optimizing for speed and privacy.', '2024-01-15', 'AI Code Assistant'),
    ('Codeium', 0, 'active', 'Free AI-powered coding assistant with autocomplete and chat capabilities', '2024-01-18', 'AI Code Assistant'),
    ('Amazon Q Developer', 0, 'active', 'AI coding assistant integrated with AWS services for development and debugging.', '2024-01-16', 'AI Code Assistant & Cloud Integration'),
    ('Cursor', 0, 'active', 'AI-powered IDE with enhanced coding, debugging, and refactoring capabilities', '2024-01-14', 'AI Code Assistant & AI-Powered IDE'),
    ('Windsurf', 0, 'active', 'AI-driven code generation and optimization tool for software development.', '2024-01-10', 'AI Code Assistant & Code Optimization'),
    ('CodeGPT', 0, 'active', 'Open-source AI assistant for code completion and chat, based on large language models', '2024-01-12', 'AI Code Assistant & Open Source');


INSERT INTO assessments (tool_id) 
VALUES 
    ((SELECT id FROM tools WHERE name = 'GitHub Copilot')),
    ((SELECT id FROM tools WHERE name = 'Tabnine')),
    ((SELECT id FROM tools WHERE name = 'Codeium')),
    ((SELECT id FROM tools WHERE name = 'Amazon Q Developer')),
    ((SELECT id FROM tools WHERE name = 'Cursor')),
    ((SELECT id FROM tools WHERE name = 'Windsurf')),
    ((SELECT id FROM tools WHERE name = 'CodeGPT'));


INSERT INTO assessment_scores (assessment_id, total, intelligence, acceleration, experience, value)
VALUES 
	((SELECT id from assessments where tool_id = (SELECT id FROM tools WHERE name = 'GitHub Copilot')), 0, 0, 0, 0, 0),
	((SELECT id from assessments where tool_id = (SELECT id FROM tools WHERE name = 'Tabnine')), 0, 0, 0, 0, 0),
	((SELECT id from assessments where tool_id = (SELECT id FROM tools WHERE name = 'Codeium')), 0, 0, 0, 0, 0),
	((SELECT id from assessments where tool_id = (SELECT id FROM tools WHERE name = 'Amazon Q Developer')), 0, 0, 0, 0, 0),
	((SELECT id from assessments where tool_id = (SELECT id FROM tools WHERE name = 'Cursor')), 0, 0, 0, 0, 0),
	((SELECT id from assessments where tool_id = (SELECT id FROM tools WHERE name = 'Windsurf')), 0, 0, 0, 0, 0),
	((SELECT id from assessments where tool_id = (SELECT id FROM tools WHERE name = 'CodeGPT')), 0, 0, 0, 0, 0);

INSERT INTO assessment_categories (assessment_id, name, score)
VALUES
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'GitHub Copilot'), 
     'Intelligence', 
     '{"score": {"contextAwareness": 0, "outputQuality": 0, "autonomy": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'GitHub Copilot'), 
     'Acceleration', 
     '{"score": {"iterationSize": 0, "iterationSpeed": 0, "capabilities": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'GitHub Copilot'), 
     'Experience', 
     '{"score": {"flexibility": 0, "easeOfUse": 0, "reliability": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'GitHub Copilot'), 
     'Value', 
     '{"score": {"value": 0}, "notes": ""}'
    );

INSERT INTO assessment_categories (assessment_id, name, score)
VALUES
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Tabnine'), 
     'Intelligence', 
     '{"score": {"contextAwareness": 0, "outputQuality": 0, "autonomy": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Tabnine'), 
     'Acceleration', 
     '{"score": {"iterationSize": 0, "iterationSpeed": 0, "capabilities": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Tabnine'), 
     'Experience', 
     '{"score": {"flexibility": 0, "easeOfUse": 0, "reliability": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Tabnine'), 
     'Value', 
     '{"score": {"value": 0}, "notes": ""}'
    );

INSERT INTO assessment_categories (assessment_id, name, score)
VALUES
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Codeium'), 
     'Intelligence', 
     '{"score": {"contextAwareness": 0, "outputQuality": 0, "autonomy": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Codeium'), 
     'Acceleration', 
     '{"score": {"iterationSize": 0, "iterationSpeed": 0, "capabilities": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Codeium'), 
     'Experience', 
     '{"score": {"flexibility": 0, "easeOfUse": 0, "reliability": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Codeium'), 
     'Value', 
     '{"score": {"value": 0}, "notes": ""}'
    );

INSERT INTO assessment_categories (assessment_id, name, score)
VALUES
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Amazon Q Developer'), 
     'Intelligence', 
     '{"score": {"contextAwareness": 0, "outputQuality": 0, "autonomy": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Amazon Q Developer'), 
     'Acceleration', 
     '{"score": {"iterationSize": 0, "iterationSpeed": 0, "capabilities": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Amazon Q Developer'), 
     'Experience', 
     '{"score": {"flexibility": 0, "easeOfUse": 0, "reliability": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Amazon Q Developer'), 
     'Value', 
     '{"score": {"value": 0}, "notes": ""}'
    );


INSERT INTO assessment_categories (assessment_id, name, score)
VALUES
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Cursor'), 
     'Intelligence', 
     '{"score": {"contextAwareness": 0, "outputQuality": 0, "autonomy": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Cursor'), 
     'Acceleration', 
     '{"score": {"iterationSize": 0, "iterationSpeed": 0, "capabilities": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Cursor'), 
     'Experience', 
     '{"score": {"flexibility": 0, "easeOfUse": 0, "reliability": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Cursor'), 
     'Value', 
     '{"score": {"value": 0}, "notes": ""}'
    );


INSERT INTO assessment_categories (assessment_id, name, score)
VALUES
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Windsurf'), 
     'Intelligence', 
     '{"score": {"contextAwareness": 0, "outputQuality": 0, "autonomy": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Windsurf'), 
     'Acceleration', 
     '{"score": {"iterationSize": 0, "iterationSpeed": 0, "capabilities": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Windsurf'), 
     'Experience', 
     '{"score": {"flexibility": 0, "easeOfUse": 0, "reliability": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'Windsurf'), 
     'Value', 
     '{"score": {"value": 0}, "notes": ""}'
    );

INSERT INTO assessment_categories (assessment_id, name, score)
VALUES
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'CodeGPT'), 
     'Intelligence', 
     '{"score": {"contextAwareness": 0, "outputQuality": 0, "autonomy": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'CodeGPT'), 
     'Acceleration', 
     '{"score": {"iterationSize": 0, "iterationSpeed": 0, "capabilities": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'CodeGPT'), 
     'Experience', 
     '{"score": {"flexibility": 0, "easeOfUse": 0, "reliability": 0}, "notes": ""}'
    ),
    ((SELECT a.id FROM assessments a 
      JOIN tools t ON t.id = a.tool_id 
      WHERE t.name = 'CodeGPT'), 
     'Value', 
     '{"score": {"value": 0}, "notes": ""}'
    );
	