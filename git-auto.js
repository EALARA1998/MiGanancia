import { execSync } from 'child_process';
import readline from 'readline';

const repository = 'https://github.com/EALARA1998/MiGanancia.git';

// Crear interfaz de lectura para el input del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para ejecutar comandos y mostrar salida sincronizada
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Error ejecutando: ${command}`);
    process.exit(1); // Termina si hay error
  }
}

// Actualizar el remoto si se especifica uno
if (repository) {
  runCommand(`git remote set-url origin ${repository}`);
  console.log(`✅ Remoto actualizado: ${repository}`);
}

// Pedir mensaje de commit
rl.question('📝 Escribe el mensaje del commit: ', (commitMessage) => {
  console.log('\n🚀 Ejecutando comandos Git...\n');

  // Ejecutar comandos git (ajusta 'master' si tu rama es diferente)
  let currentBranch;
  try {
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (error) {
    console.error('❌ No se pudo obtener la rama actual. Es probable que aún no hayas hecho el primer commit.');
    process.exit(1);
  }
  runCommand(`git pull origin ${currentBranch}`);
  runCommand('git add .');
  runCommand(`git commit -m "${commitMessage}"`);
  runCommand(`git push origin ${currentBranch}`);

  console.log('\n✅ ¡Cambios enviados a GitHub con éxito!');
  rl.close();
});
