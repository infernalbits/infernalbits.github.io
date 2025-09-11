import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [typingStates, setTypingStates] = useState<Record<string, string>>({});
  const [foundLinks, setFoundLinks] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeCommand, setActiveCommand] = useState<string | null>('command1');
  const matrixRef = useRef<HTMLDivElement>(null);

  const commands = [
    { id: 'command1', text: 'eval $(remote-protocol --secure --shell --bind localhost:2342)', delay: 1000, output: 'output1', nextLine: 'line2' },
    { id: 'command2', text: 'scan-asp infernalbits.localnet', delay: 4000, output: 'output2', nextLine: 'line3' },
    { id: 'command3', text: 'systemctl start tor-node', delay: 8000, output: 'output3', nextLine: 'line4' },
    { id: 'command4', text: 'fd -tf -H hidden.* .', delay: 14000, output: 'hiddenLinkArea', nextLine: null }
  ];

  // Matrix background effect
  useEffect(() => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    const createMatrixColumn = () => {
      if (!matrixRef.current) return;
      
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = Math.random() * 100 + '%';
      column.style.animationDelay = Math.random() * 20 + 's';
      column.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      let text = '';
      const height = Math.floor(Math.random() * 20) + 10;
      for (let i = 0; i < height; i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
      }
      column.innerHTML = text;
      
      matrixRef.current.appendChild(column);
      
      setTimeout(() => {
        if (column.parentNode) {
          column.parentNode.removeChild(column);
        }
      }, 30000);
    };

    // Initial columns
    for (let i = 0; i < 15; i++) {
      setTimeout(createMatrixColumn, i * 1000);
    }

    // Continuous creation
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        createMatrixColumn();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Typing animation
  const typeText = (commandId: string, text: string, callback?: () => void) => {
    setActiveCommand(commandId);
    let i = 0;
    const typeChar = () => {
      if (i < text.length) {
        setTypingStates(prev => ({
          ...prev,
          [commandId]: text.substring(0, i + 1)
        }));
        i++;
        setTimeout(typeChar, Math.random() * 100 + 50);
      } else {
        // Remove cursor from this command when typing is complete
        setActiveCommand(null);
        if (callback) {
          setTimeout(callback, 500);
        }
      }
    };
    typeChar();
  };

  const showElement = (id: string, delay: number = 0) => {
    setTimeout(() => {
      setVisibleElements(prev => new Set(prev).add(id));
    }, delay);
  };

  // Terminal sequence
  useEffect(() => {
    const executeSequence = (index: number) => {
      if (index >= commands.length) return;
      
      const command = commands[index];
      
      setTimeout(() => {
        typeText(command.id, command.text, () => {
          showElement(command.output, 500);
          if (command.nextLine) {
            showElement(command.nextLine, 1500);
          }
          
          setTimeout(() => {
            executeSequence(index + 1);
          }, 2000);
        });
      }, index === 0 ? command.delay : 2500);
    };

    executeSequence(0);
  }, []);

  const handleHiddenClick = () => {
    const newFoundLinks = foundLinks + 1;
    setFoundLinks(newFoundLinks);
    
    if (newFoundLinks >= 2) {
      setShowModal(true);
    } else {
      // Visual feedback
      document.body.style.animation = 'flicker 0.1s ease-in-out 3';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 300);
    }
  };

  return (
    <div className="bg-terminal-bg text-terminal-green font-mono min-h-screen overflow-hidden relative">
      {/* Matrix Background */}
      <div ref={matrixRef} className="matrix-bg"></div>
      
      {/* Scanlines */}
      <div className="scanlines"></div>
      
      {/* Hidden Easter Egg Links */}
      <button 
        className="hidden-link"
        style={{ top: '20%', right: '15%' }}
        onClick={handleHiddenClick}
        data-testid="hidden-link-1"
        title=""
      />
      <button 
        className="hidden-link"
        style={{ bottom: '30%', left: '10%' }}
        onClick={handleHiddenClick}
        data-testid="hidden-link-2"
        title=""
      />
      <button 
        className="hidden-link"
        style={{ top: '60%', left: '50%' }}
        onClick={handleHiddenClick}
        data-testid="hidden-link-3"
        title=""
      />
      
      {/* Main Terminal Interface */}
      <div className="relative z-20 p-4 md:p-8 min-h-screen flex flex-col animate-flicker">
        {/* Terminal Header */}
        <div className="mb-6 md:mb-8">
          <div className="text-terminal-cyan text-sm mb-2">
            █ SECURE TERMINAL ACCESS - INFERNALBITS SYSTEMS
          </div>
          <div className="text-terminal-dim text-xs">
            Connection established... Encryption: AES-256 | Status: AUTHENTICATED
          </div>
        </div>
        
        {/* ASCII Art Logo */}
        <div className="mb-8 md:mb-12 font-mono text-xs md:text-sm" data-testid="ascii-logo">
          <pre className="terminal-text leading-tight">
{` ██▓ ███▄    █   █████▒▓█████  ██▀███   ███▄    █  ▄▄▄       ██▓      ▄▄▄▄    ██▓▄▄▄█████▓  ██████ 
▓██▒ ██ ▀█   █ ▓██   ▒ ▓█   ▀ ▓██ ▒ ██▒ ██ ▀█   █ ▒████▄    ▓██▒     ▓█████▄ ▓██▒▓  ██▒ ▓▒▒██    ▒ 
▒██▒▓██  ▀█ ██▒▒████ ░ ▒███   ▓██ ░▄█ ▒▓██  ▀█ ██▒▒██  ▀█▄  ▒██░     ▒██▒ ▄██▒██▒▒ ▓██░ ▒░░ ▓██▄   
░██░▓██▒  ▐▌██▒░▓█▒  ░ ▒▓█  ▄ ▒██▀▀█▄  ▓██▒  ▐▌██▒░██▄▄▄▄██ ▒██░     ▒██░█▀  ░██░░ ▓██▓ ░   ▒   ██▒
░██░▒██░   ▓██░░▒█░    ░▒████▒░██▓ ▒██▒▒██░   ▓██░ ▓█   ▓██▒░██████▒ ░▓█  ▀█▓░██░  ▒██▒ ░ ▒██████▒▒
░▓  ░ ▒░   ▒ ▒  ▒ ░    ░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒░   ▒ ▒  ▒▒   ▓▒█░░ ▒░▓  ░ ░▒▓███▀▒░▓    ▒ ░░   ▒ ▒▓▒ ▒ ░
 ▒ ░░ ░░   ░ ▒░ ░       ░ ░  ░  ░▒ ░ ▒░░ ░░   ░ ▒░  ▒   ▒▒ ░░ ░ ▒  ░ ▒░▒   ░  ▒ ░    ░    ░ ░▒  ░ ░
 ▒ ░   ░   ░ ░  ░ ░       ░     ░░   ░    ░   ░ ░   ░   ▒     ░ ░     ░    ░  ▒ ░  ░      ░  ░  ░  
 ░           ░            ░  ░   ░              ░       ░  ░    ░  ░  ░         ░                ░`}
          </pre>
        </div>
        
        {/* Terminal Output */}
        <div className="flex-1 space-y-2 md:space-y-4" data-testid="terminal-output">
          <div className="text-terminal-green">
            <span className="text-terminal-cyan">root@infernalbits:~$</span> 
            <span data-testid="command-1"> {typingStates.command1 || ''}</span>
            {activeCommand === 'command1' && <span className="animate-blink cursor">█</span>}
          </div>
          
          {visibleElements.has('output1') && (
            <div className="text-terminal-dark-green ml-4" data-testid="output-1">
              Initializing secure connection...<br/>
              Bypassing security protocols...<br/>
              <span className="text-terminal-cyan">█ █ █</span> AUTHORIZED ACCESS GRANTED <span className="text-terminal-cyan">█ █ █</span>
            </div>
          )}
          
          {visibleElements.has('line2') && (
            <div className="text-terminal-green">
              <span className="text-terminal-cyan">root@infernalbits:~$</span> 
              <span data-testid="command-2"> {typingStates.command2 || ''}</span>
              {activeCommand === 'command2' && <span className="animate-blink cursor">█</span>}
            </div>
          )}
          
          {visibleElements.has('output2') && (
            <div className="text-terminal-dark-green ml-4" data-testid="output-2">
              Scanning network topology...<br/>
              Identifying secure channels...<br/>
              ████████████████ 100% COMPLETE
            </div>
          )}
          
          {visibleElements.has('line3') && (
            <div className="text-terminal-green">
              <span className="text-terminal-cyan">root@infernalbits:~$</span> 
              <span data-testid="command-3"> {typingStates.command3 || ''}</span>
              {activeCommand === 'command3' && <span className="animate-blink cursor">█</span>}
            </div>
          )}
          
          {visibleElements.has('output3') && (
            <div className="text-terminal-muted-green ml-4" data-testid="output-3">
              <div className="border border-terminal-dark-green p-4 mt-4 bg-terminal-bg-alt">
                <div className="text-terminal-cyan text-center text-lg md:text-xl mb-4">
                  ◢◤ INFERNALBITS COMING SOON ◢◤
                </div>
                <div className="text-sm md:text-base space-y-2">
                  <p>► SYSTEM STATUS: Under Development</p>
                  <p>► DEPLOYMENT: Q1 2024</p>
                  <p>► SECURITY LEVEL: Maximum</p>
                  <p>► ACCESS: Invitation Only</p>
                </div>
                <div className="text-terminal-dim text-xs mt-4 text-center">
                  For authorized personnel only. Unauthorized access is prohibited.
                </div>
              </div>
            </div>
          )}
          
          {visibleElements.has('line4') && (
            <div className="text-terminal-green">
              <span className="text-terminal-cyan">root@infernalbits:~$</span> 
              <span data-testid="command-4"> {typingStates.command4 || ''}</span>
              {activeCommand === 'command4' && <span className="animate-blink cursor">█</span>}
            </div>
          )}
          
          {visibleElements.has('hiddenLinkArea') && (
            <div className="text-terminal-dim text-xs mt-8" data-testid="hidden-hint">
              <div className="text-center">
                <p>◄ Search carefully for hidden access points ►</p>
                <p className="text-terminal-dark-green">Three points of entry exist within this terminal...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-terminal-dim text-xs text-center">
          <p>INFERNALBITS SECURITY SYSTEMS © 2024 | TERMINAL v2.1.337</p>
          <p className="mt-1">Connection secured via quantum encryption</p>
        </div>
      </div>
      
      {/* Hidden Link Reveal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" data-testid="link-modal">
          <div className="border border-terminal-green bg-terminal-bg p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-terminal-cyan text-xl mb-4">◢◤ ACCESS POINT FOUND ◢◤</div>
              <div className="text-terminal-green mb-6">
                You have discovered a hidden entry point.<br/>
                Proceed with caution.
              </div>
              <div className="space-y-4">
                <a 
                  href="#" 
                  className="block border border-terminal-dark-green bg-terminal-bg-alt text-terminal-cyan px-4 py-2 hover:bg-terminal-dark-green hover:text-black transition-colors"
                  data-testid="enter-portal-link"
                >
                  ► ENTER SECURE PORTAL
                </a>
                <button 
                  onClick={() => setShowModal(false)}
                  className="block w-full border border-terminal-dim text-terminal-dim px-4 py-2 hover:border-terminal-green hover:text-terminal-green transition-colors"
                  data-testid="return-terminal-button"
                >
                  ► RETURN TO TERMINAL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
