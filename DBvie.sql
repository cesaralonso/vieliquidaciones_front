-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema vieliquidaciones
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema vieliquidaciones
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vieliquidaciones` DEFAULT CHARACTER SET utf8 ;
USE `vieliquidaciones` ;

-- -----------------------------------------------------
-- Table `vieliquidaciones`.`coordenada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`coordenada` (
  `idcoordenada` INT(11) NOT NULL AUTO_INCREMENT,
  `latitud` VARCHAR(45) NULL DEFAULT NULL,
  `longitud` VARCHAR(45) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idcoordenada`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`persona` (
  `idpersona` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `edad` INT(11) NULL DEFAULT NULL,
  `sexo` VARCHAR(15) NULL DEFAULT NULL,
  `RFC` VARCHAR(45) NULL DEFAULT NULL,
  `telefono` INT(11) NULL DEFAULT NULL,
  `domicilio` VARCHAR(60) NULL DEFAULT NULL,
  `coordenada_idcoordenada` INT(11) NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idpersona`),
  INDEX `fk_persona_coordenada1_idx` (`coordenada_idcoordenada` ASC),
  CONSTRAINT `fk_persona_coordenada1`
    FOREIGN KEY (`coordenada_idcoordenada`)
    REFERENCES `vieliquidaciones`.`coordenada` (`idcoordenada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`chofer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`chofer` (
  `idchofer` INT(11) NOT NULL AUTO_INCREMENT,
  `licencia` VARCHAR(40) NULL DEFAULT NULL,
  `fianza` INT(11) NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `chofer` INT(11) NOT NULL,
  `aval1` INT(11) NOT NULL,
  `aval2` INT(11) NOT NULL,
  `aval3` INT(11) NOT NULL,
  `aval4` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idchofer`),
  INDEX `fk_chofer_persona1_idx` (`chofer` ASC),
  INDEX `fk_chofer_persona2_idx` (`aval1` ASC),
  INDEX `fk_chofer_persona3_idx` (`aval2` ASC),
  INDEX `fk_chofer_persona4_idx` (`aval3` ASC),
  INDEX `fk_chofer_persona5_idx` (`aval4` ASC),
  CONSTRAINT `fk_chofer_persona1`
    FOREIGN KEY (`chofer`)
    REFERENCES `vieliquidaciones`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chofer_persona2`
    FOREIGN KEY (`aval1`)
    REFERENCES `vieliquidaciones`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chofer_persona3`
    FOREIGN KEY (`aval2`)
    REFERENCES `vieliquidaciones`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chofer_persona4`
    FOREIGN KEY (`aval3`)
    REFERENCES `vieliquidaciones`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chofer_persona5`
    FOREIGN KEY (`aval4`)
    REFERENCES `vieliquidaciones`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`bonificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`bonificacion` (
  `idbonificacion` INT(11) NOT NULL AUTO_INCREMENT,
  `cantidad` FLOAT NULL,
  `validado` TINYINT(4) NULL,
  `status` VARCHAR(25) NULL,
  `concepto` VARCHAR(45) NULL,
  `chofer_idchofer` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idbonificacion`),
  INDEX `fk_bonificacion_chofer1_idx` (`chofer_idchofer` ASC),
  CONSTRAINT `fk_bonificacion_chofer1`
    FOREIGN KEY (`chofer_idchofer`)
    REFERENCES `vieliquidaciones`.`chofer` (`idchofer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`liquidacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`liquidacion` (
  `idliquidacion` INT(11) NOT NULL,
  `cantidadRecibida` INT(11) NULL DEFAULT NULL,
  `cambio` INT(11) NULL DEFAULT NULL,
  `folio` VARCHAR(45) NULL DEFAULT NULL,
  `kilometraje` INT(11) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `nota` VARCHAR(60) NULL DEFAULT NULL,
  `cantPagada` INT(11) NULL DEFAULT NULL,
  `cantDeuda` INT(11) NULL DEFAULT NULL,
  `status` VARCHAR(25) NULL DEFAULT NULL,
  `bonificado` INT(11) NULL DEFAULT NULL,
  `chofer_idchofer` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idliquidacion`),
  INDEX `fk_liquidacion_chofer1_idx` (`chofer_idchofer` ASC),
  CONSTRAINT `fk_liquidacion_chofer1`
    FOREIGN KEY (`chofer_idchofer`)
    REFERENCES `vieliquidaciones`.`chofer` (`idchofer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`bonificacion_has_liquidacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`bonificacion_has_liquidacion` (
  `bonificacion_idbonificacion` INT(11) NOT NULL,
  `liquidacion_idliquidacion` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  INDEX `fk_bonificacion_has_liquidacion_bonificacion1_idx` (`bonificacion_idbonificacion` ASC),
  INDEX `fk_bonificacion_has_liquidacion_liquidacion1_idx` (`liquidacion_idliquidacion` ASC),
  CONSTRAINT `fk_bonificacion_has_liquidacion_bonificacion1`
    FOREIGN KEY (`bonificacion_idbonificacion`)
    REFERENCES `vieliquidaciones`.`bonificacion` (`idbonificacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bonificacion_has_liquidacion_liquidacion1`
    FOREIGN KEY (`liquidacion_idliquidacion`)
    REFERENCES `vieliquidaciones`.`liquidacion` (`idliquidacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`concepto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`concepto` (
  `idconcepto` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idconcepto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`vehiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`vehiculo` (
  `idvehiculo` INT(11) NOT NULL AUTO_INCREMENT,
  `marca` VARCHAR(20) NULL DEFAULT NULL,
  `modelo` VARCHAR(20) NULL DEFAULT NULL,
  `anio` INT(11) NULL DEFAULT NULL,
  `serie` VARCHAR(30) NULL DEFAULT NULL,
  `serieMotor` VARCHAR(40) NULL DEFAULT NULL,
  `placa` VARCHAR(10) NULL DEFAULT NULL,
  `kilometraje` INT(11) NULL DEFAULT NULL,
  `status` VARCHAR(15) NULL DEFAULT NULL,
  `poliza` VARCHAR(15) NULL DEFAULT NULL,
  `polizaTipo` VARCHAR(15) NULL DEFAULT NULL,
  `condActual` VARCHAR(150) NULL DEFAULT NULL,
  `condInicial` VARCHAR(150) NULL DEFAULT NULL,
  `color` VARCHAR(20) NULL DEFAULT NULL,
  `propietario` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idvehiculo`),
  INDEX `fk_vehiculo_persona_idx` (`propietario` ASC),
  CONSTRAINT `fk_vehiculo_persona`
    FOREIGN KEY (`propietario`)
    REFERENCES `vieliquidaciones`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`permisotaxi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`permisotaxi` (
  `idpermisotaxi` INT(11) NOT NULL AUTO_INCREMENT,
  `numero` VARCHAR(45) NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `fechaAlta` DATE NULL DEFAULT NULL,
  `vigencia` DATE NULL DEFAULT NULL,
  `liquidez` INT(11) NULL DEFAULT NULL,
  `liquidezDom` INT(11) NULL DEFAULT NULL,
  `propietario` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idpermisotaxi`),
  INDEX `fk_permisotaxi_persona1_idx` (`propietario` ASC),
  CONSTRAINT `fk_permisotaxi_persona1`
    FOREIGN KEY (`propietario`)
    REFERENCES `vieliquidaciones`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`permisotaxiasignado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`permisotaxiasignado` (
  `idpermisotaxiasignado` INT(11) NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(25) NULL DEFAULT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `chofer_idchofer` INT(11) NOT NULL,
  `vehiculo_idvehiculo` INT(11) NOT NULL,
  `permisotaxi_idpermisotaxi` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idpermisotaxiasignado`),
  INDEX `fk_permisotaxiasignado_chofer1_idx` (`chofer_idchofer` ASC),
  INDEX `fk_permisotaxiasignado_vehiculo1_idx` (`vehiculo_idvehiculo` ASC),
  INDEX `fk_permisotaxiasignado_permisotaxi1_idx` (`permisotaxi_idpermisotaxi` ASC),
  CONSTRAINT `fk_permisotaxiasignado_chofer1`
    FOREIGN KEY (`chofer_idchofer`)
    REFERENCES `vieliquidaciones`.`chofer` (`idchofer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_permisotaxiasignado_vehiculo1`
    FOREIGN KEY (`vehiculo_idvehiculo`)
    REFERENCES `vieliquidaciones`.`vehiculo` (`idvehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_permisotaxiasignado_permisotaxi1`
    FOREIGN KEY (`permisotaxi_idpermisotaxi`)
    REFERENCES `vieliquidaciones`.`permisotaxi` (`idpermisotaxi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`corralon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`corralon` (
  `idcorralon` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL DEFAULT NULL,
  `infraccionNumero` INT(11) NULL DEFAULT NULL,
  `corralonNombre` VARCHAR(45) NULL DEFAULT NULL,
  `motivo` VARCHAR(150) NULL DEFAULT NULL,
  `status` VARCHAR(25) NULL DEFAULT NULL,
  `permisotaxiasignado_idpermisotaxiasignado` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idcorralon`),
  INDEX `fk_corralon_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado` ASC),
  CONSTRAINT `fk_corralon_permisotaxiasignado1`
    FOREIGN KEY (`permisotaxiasignado_idpermisotaxiasignado`)
    REFERENCES `vieliquidaciones`.`permisotaxiasignado` (`idpermisotaxiasignado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`taller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`taller` (
  `idtaller` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `direccion` VARCHAR(80) NULL DEFAULT NULL,
  `telefono` INT(11) NULL DEFAULT NULL,
  `descripcion` VARCHAR(80) NULL DEFAULT NULL,
  `coordenada_idcoordenada` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idtaller`),
  INDEX `fk_taller_coordenada1_idx` (`coordenada_idcoordenada` ASC),
  CONSTRAINT `fk_taller_coordenada1`
    FOREIGN KEY (`coordenada_idcoordenada`)
    REFERENCES `vieliquidaciones`.`coordenada` (`idcoordenada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`egresoconcepto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`egresoconcepto` (
  `idegresoconcepto` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL DEFAULT NULL,
  `total` INT(11) NULL DEFAULT NULL,
  `taller_idtaller` INT(11) NOT NULL,
  `concepto_idconcepto` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idegresoconcepto`),
  INDEX `fk_egresoconcepto_taller1_idx` (`taller_idtaller` ASC),
  INDEX `fk_egresoconcepto_concepto1_idx` (`concepto_idconcepto` ASC),
  CONSTRAINT `fk_egresoconcepto_taller1`
    FOREIGN KEY (`taller_idtaller`)
    REFERENCES `vieliquidaciones`.`taller` (`idtaller`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_egresoconcepto_concepto1`
    FOREIGN KEY (`concepto_idconcepto`)
    REFERENCES `vieliquidaciones`.`concepto` (`idconcepto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`enviotaller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`enviotaller` (
  `idenviotaller` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL DEFAULT NULL,
  `motivo` VARCHAR(80) NULL DEFAULT NULL,
  `permisotaxiasignado_idpermisotaxiasignado` INT(11) NOT NULL,
  `taller_idtaller` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idenviotaller`),
  INDEX `fk_enviotaller_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado` ASC),
  INDEX `fk_enviotaller_taller1_idx` (`taller_idtaller` ASC),
  CONSTRAINT `fk_enviotaller_permisotaxiasignado1`
    FOREIGN KEY (`permisotaxiasignado_idpermisotaxiasignado`)
    REFERENCES `vieliquidaciones`.`permisotaxiasignado` (`idpermisotaxiasignado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_enviotaller_taller1`
    FOREIGN KEY (`taller_idtaller`)
    REFERENCES `vieliquidaciones`.`taller` (`idtaller`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`fianza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`fianza` (
  `idfianza` INT(11) NOT NULL,
  `montopagado` FLOAT NULL DEFAULT NULL,
  `montoadeudado` FLOAT NULL DEFAULT NULL,
  `status` VARCHAR(25) NULL DEFAULT NULL,
  `chofer_idchofer` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idfianza`),
  INDEX `fk_fianza_chofer1_idx` (`chofer_idchofer` ASC),
  CONSTRAINT `fk_fianza_chofer1`
    FOREIGN KEY (`chofer_idchofer`)
    REFERENCES `vieliquidaciones`.`chofer` (`idchofer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`folio XXXXXXXXXXX
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`folio` (
  `idfolio` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idfolio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`fianza_has_folio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`fianza_has_folio` (
  `fianza_idfianza` INT(11) NOT NULL,
  `folio_idfolio` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  INDEX `fk_fianza_has_folio_fianza1_idx` (`fianza_idfianza` ASC),
  INDEX `fk_fianza_has_folio_folio1_idx` (`folio_idfolio` ASC),
  CONSTRAINT `fk_fianza_has_folio_fianza1`
    FOREIGN KEY (`fianza_idfianza`)
    REFERENCES `vieliquidaciones`.`fianza` (`idfianza`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fianza_has_folio_folio1`
    FOREIGN KEY (`folio_idfolio`)
    REFERENCES `vieliquidaciones`.`folio` (`idfolio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`liquidacion_has_folio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`liquidacion_has_folio` (
  `liquidacion_idliquidacion` INT(11) NOT NULL,
  `folio_idfolio` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  INDEX `fk_liquidacion_has_folio_liquidacion1_idx` (`liquidacion_idliquidacion` ASC),
  INDEX `fk_liquidacion_has_folio_folio1_idx` (`folio_idfolio` ASC),
  CONSTRAINT `fk_liquidacion_has_folio_liquidacion1`
    FOREIGN KEY (`liquidacion_idliquidacion`)
    REFERENCES `vieliquidaciones`.`liquidacion` (`idliquidacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_liquidacion_has_folio_folio1`
    FOREIGN KEY (`folio_idfolio`)
    REFERENCES `vieliquidaciones`.`folio` (`idfolio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`mecanico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`mecanico` (
  `idmecanico` INT(11) NOT NULL AUTO_INCREMENT,
  `persona_idpersona` INT(11) NOT NULL,
  `taller_idtaller` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idmecanico`),
  INDEX `fk_mecanico_persona1_idx` (`persona_idpersona` ASC),
  INDEX `fk_mecanico_taller2_idx` (`taller_idtaller` ASC),
  CONSTRAINT `fk_mecanico_persona1`
    FOREIGN KEY (`persona_idpersona`)
    REFERENCES `vieliquidaciones`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mecanico_taller2`
    FOREIGN KEY (`taller_idtaller`)
    REFERENCES `vieliquidaciones`.`taller` (`idtaller`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`modulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`modulo` (
  `idmodulo` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idmodulo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`vehiculoreparando`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`vehiculoreparando` (
  `idvehiculoreparando` INT(11) NOT NULL AUTO_INCREMENT,
  `fechaIngresa` DATETIME NULL DEFAULT NULL,
  `fechaSalida` DATETIME NULL DEFAULT NULL,
  `fechaEstimada` DATETIME NULL DEFAULT NULL,
  `inventario` VARCHAR(80) NULL DEFAULT NULL,
  `motivo` VARCHAR(80) NULL DEFAULT NULL,
  `status` VARCHAR(25) NULL DEFAULT NULL,
  `orden` VARCHAR(45) NULL DEFAULT NULL,
  `enviotaller_idenviotaller` INT(11) NULL,
  `taller_idtaller` INT(11) NOT NULL,
  `mecanico_idmecanico` INT(11) NOT NULL,
  `permisotaxiasignado_idpermisotaxiasignado` INT(11) NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idvehiculoreparando`),
  INDEX `fk_vehiculoreparando_enviotaller1_idx` (`enviotaller_idenviotaller` ASC),
  INDEX `fk_vehiculoreparando_taller1_idx` (`taller_idtaller` ASC),
  INDEX `fk_vehiculoreparando_mecanico1_idx` (`mecanico_idmecanico` ASC),
  INDEX `fk_vehiculoreparando_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado` ASC),
  CONSTRAINT `fk_vehiculoreparando_enviotaller1`
    FOREIGN KEY (`enviotaller_idenviotaller`)
    REFERENCES `vieliquidaciones`.`enviotaller` (`idenviotaller`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vehiculoreparando_taller1`
    FOREIGN KEY (`taller_idtaller`)
    REFERENCES `vieliquidaciones`.`taller` (`idtaller`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vehiculoreparando_mecanico1`
    FOREIGN KEY (`mecanico_idmecanico`)
    REFERENCES `vieliquidaciones`.`mecanico` (`idmecanico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vehiculoreparando_permisotaxiasignado1`
    FOREIGN KEY (`permisotaxiasignado_idpermisotaxiasignado`)
    REFERENCES `vieliquidaciones`.`permisotaxiasignado` (`idpermisotaxiasignado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`orden` (
  `idorden` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL DEFAULT NULL,
  `manoObra` INT(11) NULL DEFAULT NULL,
  `subtotal` INT(11) NULL DEFAULT NULL,
  `total` INT(11) NULL DEFAULT NULL,
  `anticipo` INT(11) NULL DEFAULT NULL,
  `status` VARCHAR(25) NULL DEFAULT NULL,
  `vehiculoreparando_idvehiculoreparando` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idorden`),
  INDEX `fk_orden_vehiculoreparando1_idx` (`vehiculoreparando_idvehiculoreparando` ASC),
  CONSTRAINT `fk_orden_vehiculoreparando1`
    FOREIGN KEY (`vehiculoreparando_idvehiculoreparando`)
    REFERENCES `vieliquidaciones`.`vehiculoreparando` (`idvehiculoreparando`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`servicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`servicio` (
  `idservicio` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `precio` INT(11) NULL DEFAULT NULL,
  `iva` INT(11) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  `taller_idtaller` INT(11) NOT NULL,
  PRIMARY KEY (`idservicio`),
  INDEX `fk_servicio_taller1_idx` (`taller_idtaller` ASC),
  CONSTRAINT `fk_servicio_taller1`
    FOREIGN KEY (`taller_idtaller`)
    REFERENCES `vieliquidaciones`.`taller` (`idtaller`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`ordenservicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`ordenservicio` (
  `idordenservicio` INT(11) NOT NULL AUTO_INCREMENT,
  `orden_idorden` INT(11) NOT NULL,
  `servicio_idservicio` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idordenservicio`),
  INDEX `fk_ordenservicio_orden1_idx` (`orden_idorden` ASC),
  INDEX `fk_ordenservicio_servicio1_idx` (`servicio_idservicio` ASC),
  CONSTRAINT `fk_ordenservicio_orden1`
    FOREIGN KEY (`orden_idorden`)
    REFERENCES `vieliquidaciones`.`orden` (`idorden`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ordenservicio_servicio1`
    FOREIGN KEY (`servicio_idservicio`)
    REFERENCES `vieliquidaciones`.`servicio` (`idservicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`rol` (
  `idrol` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idrol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`permiso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`permiso` (
  `idpermiso` INT(11) NOT NULL AUTO_INCREMENT,
  `acceso` TINYINT(4) NULL DEFAULT NULL,
  `rol_idrol` INT(11) NOT NULL,
  `modulo_idmodulo` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idpermiso`),
  INDEX `fk_Permiso_Rol1_idx` (`rol_idrol` ASC),
  INDEX `fk_Permiso_Modulo1_idx` (`modulo_idmodulo` ASC),
  CONSTRAINT `fk_Permiso_Modulo1`
    FOREIGN KEY (`modulo_idmodulo`)
    REFERENCES `vieliquidaciones`.`modulo` (`idmodulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Permiso_Rol1`
    FOREIGN KEY (`rol_idrol`)
    REFERENCES `vieliquidaciones`.`rol` (`idrol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`refaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`refaccion` (
  `idrefaccion` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `precioCompra` INT(11) NULL DEFAULT NULL,
  `precioVenta` INT(11) NULL DEFAULT NULL,
  `precioVentaIva` INT(11) NULL DEFAULT NULL,
  `taller_idtaller` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idrefaccion`),
  INDEX `fk_refaccion_taller1_idx` (`taller_idtaller` ASC),
  CONSTRAINT `fk_refaccion_taller1`
    FOREIGN KEY (`taller_idtaller`)
    REFERENCES `vieliquidaciones`.`taller` (`idtaller`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`user` (
  `iduser` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `rol_idrol` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  INDEX `fk_User_Rol_idx` (`rol_idrol` ASC),
  CONSTRAINT `fk_User_Rol`
    FOREIGN KEY (`rol_idrol`)
    REFERENCES `vieliquidaciones`.`rol` (`idrol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vieliquidaciones`.`ordenrefaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vieliquidaciones`.`ordenrefaccion` (
  `idordenrefaccion` INT NOT NULL AUTO_INCREMENT,
  `orden_idorden` INT(11) NOT NULL,
  `refaccion_idrefaccion` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idordenrefaccion`),
  INDEX `fk_ordenrefaccion_orden1_idx` (`orden_idorden` ASC),
  INDEX `fk_ordenrefaccion_refaccion1_idx` (`refaccion_idrefaccion` ASC),
  CONSTRAINT `fk_ordenrefaccion_orden1`
    FOREIGN KEY (`orden_idorden`)
    REFERENCES `vieliquidaciones`.`orden` (`idorden`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ordenrefaccion_refaccion1`
    FOREIGN KEY (`refaccion_idrefaccion`)
    REFERENCES `vieliquidaciones`.`refaccion` (`idrefaccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
