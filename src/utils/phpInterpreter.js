/**
 * MODERN ES6 PHP SIMULATOR ENGINE
 * A line-by-line custom PHP interpreter in JavaScript designed to simulate
 * server-side variable memory, output buffer compiling, loops, conditionals and $_POST arrays.
 */

export class PHPInterpreter {
  constructor(code, formInputs = { username: "Felipe Louzeiro", email: "felipe@aprendiz.com" }) {
    this.lines = code.split('\n');
    this.currentLineIndex = -1;
    this.variables = {};
    this.outputBuffer = "";
    this.isExecuting = true;
    this.formInputs = formInputs;
    this.session = { logged_in: false, user_id: null }; // Support for $_SESSION simulation
  }

  reset() {
    this.variables = {};
    this.outputBuffer = "";
    this.currentLineIndex = -1;
    this.isExecuting = true;
  }

  step() {
    this.currentLineIndex++;

    if (this.currentLineIndex >= this.lines.length) {
      this.isExecuting = false;
      return {
        finished: true,
        currentLineIndex: -1,
        variables: this.variables,
        outputBuffer: this.outputBuffer,
        session: this.session
      };
    }

    const rawLine = this.lines[this.currentLineIndex];
    const cleanLine = rawLine.trim();

    // Check if line is empty or comment, or PHP opening/closing tags
    if (
      cleanLine === "" || 
      cleanLine.startsWith('//') || 
      cleanLine.startsWith('#') || 
      cleanLine.startsWith('<?php') || 
      cleanLine.startsWith('?>')
    ) {
      return {
        finished: false,
        currentLineIndex: this.currentLineIndex,
        variables: this.variables,
        outputBuffer: this.outputBuffer,
        session: this.session,
        skipped: true,
        lineContent: cleanLine
      };
    }

    try {
      this.executeLine(cleanLine);
    } catch (e) {
      console.error("Syntax Error inside simulated PHP server: ", e);
      this.outputBuffer += `<div style="color:red; font-family:monospace; padding:10px; border:1px solid red; background:#ffebeb; border-radius:4px; margin-top:8px;">[Erro de Sintaxe do PHP no Servidor: Linha ${this.currentLineIndex + 1}]<br>${e.message}</div>`;
    }

    return {
      finished: false,
      currentLineIndex: this.currentLineIndex,
      variables: this.variables,
      outputBuffer: this.outputBuffer,
      session: this.session,
      skipped: false,
      lineContent: cleanLine
    };
  }

  executeLine(line) {
    // Remove ending semicolon
    if (line.endsWith(';')) {
      line = line.slice(0, -1).trim();
    }

    // 1. session_start() simulation
    if (line.startsWith('session_start()')) {
      this.session.logged_in = false;
      return;
    }

    // 2. $_SESSION variable writing (e.g. $_SESSION["logged_in"] = true)
    if (line.startsWith('$_SESSION[') && line.includes('=')) {
      const eqIdx = line.indexOf('=');
      const sessionExpr = line.slice(0, eqIdx).trim();
      const expression = line.slice(eqIdx + 1).trim();
      
      const match = sessionExpr.match(/\$_SESSION\[['"](.*)['"]\]/);
      if (match) {
        const key = match[1];
        const val = this.evaluateExpression(expression);
        this.session[key] = val;
      }
      return;
    }

    // 3. Variable Assignment (e.g. $usuario = "Felipe")
    if (line.startsWith('$') && line.includes('=')) {
      const eqIdx = line.indexOf('=');
      const varName = line.slice(1, eqIdx).trim();
      const expression = line.slice(eqIdx + 1).trim();

      const val = this.evaluateExpression(expression);
      this.variables[varName] = val;
      return;
    }

    // 4. Output command (e.g. echo "Hello")
    if (line.startsWith('echo ')) {
      const expression = line.slice(5).trim();
      const val = this.evaluateExpression(expression);
      this.outputBuffer += String(val);
      return;
    }

    // 5. Loops (e.g. while ($i < 4))
    if (line.startsWith('while')) {
      const match = line.match(/while\s*\((.*)\)/);
      if (match) {
        const condition = match[1].trim();
        const condValue = this.evaluateExpression(condition);
        if (!condValue) {
          // If condition is false, skip ahead to matching closing bracket '}'
          let depth = 1;
          for (let i = this.currentLineIndex + 1; i < this.lines.length; i++) {
            if (this.lines[i].includes('{')) depth++;
            if (this.lines[i].includes('}')) {
              depth--;
              if (depth === 0) {
                this.currentLineIndex = i; // Move index beyond loop block
                break;
              }
            }
          }
        }
      }
      return;
    }

    // 6. Conditionals (e.g. if ($vip))
    if (line.startsWith('if')) {
      const match = line.match(/if\s*\((.*)\)/);
      if (match) {
        const condition = match[1].trim();
        const condValue = this.evaluateExpression(condition);
        if (!condValue) {
          // Jump to next matching else or end of block
          let depth = 1;
          for (let i = this.currentLineIndex + 1; i < this.lines.length; i++) {
            if (this.lines[i].includes('{')) depth++;
            if (this.lines[i].includes('}')) {
              depth--;
              if (depth === 0) {
                if (i + 1 < this.lines.length && this.lines[i + 1].trim().startsWith('else')) {
                  this.currentLineIndex = i + 1; // Execute else branch
                } else {
                  this.currentLineIndex = i; // Close block
                }
                break;
              }
            }
          }
        }
      }
      return;
    }

    // 7. Rewind logic at loop completion brace '}'
    if (line === '}') {
      let depth = 1;
      for (let i = this.currentLineIndex - 1; i >= 0; i--) {
        if (this.lines[i].includes('}')) depth++;
        if (this.lines[i].includes('{')) {
          depth--;
          if (depth === 0) {
            if (this.lines[i].trim().startsWith('while')) {
              this.currentLineIndex = i - 1; // Re-evaluate loop check
            }
            break;
          }
        }
      }
      return;
    }

    // 8. Skip else block when entered naturally
    if (line.startsWith('else')) {
      let depth = 1;
      for (let i = this.currentLineIndex + 1; i < this.lines.length; i++) {
        if (this.lines[i].includes('{')) depth++;
        if (this.lines[i].includes('}')) {
          depth--;
          if (depth === 0) {
            this.currentLineIndex = i;
            break;
          }
        }
      }
    }
  }

  evaluateExpression(expr) {
    expr = expr.trim();

    if (expr === 'true') return true;
    if (expr === 'false') return false;

    // Double quotes: variable interpolation (e.g. "Olá, $usuario!")
    if (expr.startsWith('"') && expr.endsWith('"')) {
      let content = expr.slice(1, -1);
      // Interpolate normal variables
      for (const [vName, vVal] of Object.entries(this.variables)) {
        content = content.replace(new RegExp('\\$' + vName + '\\b', 'g'), vVal);
      }
      // Interpolate session variables
      for (const [sName, sVal] of Object.entries(this.session)) {
        content = content.replace(new RegExp('\\$_SESSION\\[[\'"]' + sName + '[\'"]\\]', 'g'), sVal);
      }
      return content;
    }

    // Single quotes: string literal
    if (expr.startsWith("'") && expr.endsWith("'")) {
      return expr.slice(1, -1);
    }

    // Arrays declaration (e.g. ["a", "b"])
    if (expr.startsWith('[') && expr.endsWith(']')) {
      const items = expr.slice(1, -1).split(',');
      return items.map(i => this.evaluateExpression(i.trim()));
    }

    // String Concatenations via point (.)
    if (expr.includes('.')) {
      const parts = expr.split('.');
      return parts.map(p => String(this.evaluateExpression(p.trim()))).join('');
    }

    // $_POST Superglobal reading (e.g. $_POST["username"])
    if (expr.startsWith('$_POST[')) {
      const match = expr.match(/\$_POST\[['"](.*)['"]\]/);
      if (match) {
        const key = match[1];
        return this.formInputs[key] !== undefined ? this.formInputs[key] : "Visitante";
      }
    }

    // $_SESSION Superglobal reading (e.g. $_SESSION["user_id"])
    if (expr.startsWith('$_SESSION[')) {
      const match = expr.match(/\$_SESSION\[['"](.*)['"]\]/);
      if (match) {
        const key = match[1];
        return this.session[key] !== undefined ? this.session[key] : null;
      }
    }

    // Array Item reading (e.g. $materias[$i])
    if (expr.startsWith('$') && expr.includes('[')) {
      const match = expr.match(/^\$([a-zA-Z0-9_]+)\[(.*)\]$/);
      if (match) {
        const arrName = match[1];
        const keyExpr = match[2];
        const arr = this.variables[arrName];
        const idx = this.evaluateExpression(keyExpr);
        if (arr && Array.isArray(arr)) {
          return arr[idx];
        }
      }
    }

    // Math Operators (+, -, *, /)
    if (/[+\-*/]/.test(expr)) {
      let resolved = expr;
      for (const [vName, vVal] of Object.entries(this.variables)) {
        resolved = resolved.replace(new RegExp('\\$' + vName + '\\b', 'g'), typeof vVal === 'number' ? vVal : 0);
      }
      try {
        return Function(`"use strict"; return (${resolved})`)();
      } catch {
        return 0;
      }
    }

    // Conditional Comparisons (<, >, ==, ===, !=)
    if (/[<>=!]/.test(expr)) {
      let resolved = expr;
      for (const [vName, vVal] of Object.entries(this.variables)) {
        const representation = typeof vVal === 'string' ? `"${vVal}"` : vVal;
        resolved = resolved.replace(new RegExp('\\$' + vName + '\\b', 'g'), representation);
      }
      for (const [sName, sVal] of Object.entries(this.session)) {
        const representation = typeof sVal === 'string' ? `"${sVal}"` : sVal;
        resolved = resolved.replace(new RegExp('\\$_SESSION\\[[\'"]' + sName + '[\'"]\\]', 'g'), representation);
      }
      try {
        return Function(`"use strict"; return (${resolved})`)();
      } catch {
        return false;
      }
    }

    // Variable Reading (e.g. $usuario)
    if (expr.startsWith('$')) {
      const varName = expr.slice(1).trim();
      return this.variables[varName] !== undefined ? this.variables[varName] : null;
    }

    // Parse Numbers
    if (!isNaN(expr)) {
      return Number(expr);
    }

    return expr;
  }
}
