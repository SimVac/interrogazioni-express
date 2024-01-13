SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interrogazioni`
--
DROP DATABASE IF EXISTS `interrogazioni`;
CREATE DATABASE IF NOT EXISTS `interrogazioni` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `interrogazioni`;

-- --------------------------------------------------------

--
-- Struttura della tabella `avviso`
--

DROP TABLE IF EXISTS `avviso`;
CREATE TABLE `avviso` (
  `id` int NOT NULL,
  `titolo` varchar(100) NOT NULL,
  `descrizione` text NOT NULL,
  `data` datetime NOT NULL,
  `preferito` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `e_interrogato`
--

DROP TABLE IF EXISTS `e_interrogato`;
CREATE TABLE `e_interrogato` (
  `id` int NOT NULL,
  `posizione` int NOT NULL,
  `interrogato` tinyint(1) NOT NULL,
  `offerto` tinyint(1) NOT NULL,
  `id_studente` int NOT NULL,
  `id_materia` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `materia`
--

DROP TABLE IF EXISTS `materia`;
CREATE TABLE `materia` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `abbreviazione` varchar(100) NOT NULL,
  `endpoint` varchar(100) NOT NULL,
  `attivo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `studente`
--

DROP TABLE IF EXISTS `studente`;
CREATE TABLE `studente` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cognome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `avviso`
--
ALTER TABLE `avviso`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `e_interrogato`
--
ALTER TABLE `e_interrogato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studente` (`id_studente`),
  ADD KEY `materia` (`id_materia`);

--
-- Indici per le tabelle `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `studente`
--
ALTER TABLE `studente`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `avviso`
--
ALTER TABLE `avviso`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `e_interrogato`
--
ALTER TABLE `e_interrogato`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `materia`
--
ALTER TABLE `materia`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `studente`
--
ALTER TABLE `studente`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `e_interrogato`
--
ALTER TABLE `e_interrogato`
  ADD CONSTRAINT `materia` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `studente` FOREIGN KEY (`id_studente`) REFERENCES `studente` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
