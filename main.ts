/**
 *Twin Drill Jet  Mole
 */
//% weight=0 color=#3CB371 icon="\uf135" block="Jet Mole"
namespace Jet_Mole {
    let stopValue = 1023
    export enum Directions {
        //% block="moves foreward"
        foreward = 1,
        //% block="moves backward"
        backward = 2,
        //% block="sways to left side"
        leftward = 3,
        //% block="sways to right side"
        rightward = 4
    }
    export enum rotateDir {
        //% block="foreward"
        foreward = 1,
        //% block="backward"
        backward = 2
    }
    export enum motor {
        //% block="left"
        left = 1,
        //% block="right"
        right = 2
    }


    /**
    * 移動 Jet Mole 左右鑽頭同時轉動
    * move The Jet Mole
    */
    //% blockId="moveAll" block="Jet Mole %myDir|speed(0~1023) %power"
    //% power.min=0 power.max=1023 weight=100
    export function moveAll(myDir: Directions, power: number): void {
        if (power < 0)
            power = 0
        else if (power > stopValue)
            power = stopValue
        switch (myDir) {
            case 1:
                pins.analogWritePin(AnalogPin.P13, power)
                pins.digitalWritePin(DigitalPin.P14, 0)
                pins.digitalWritePin(DigitalPin.P15, 0)
                pins.analogWritePin(AnalogPin.P16, power)
                break
            case 2:
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.analogWritePin(AnalogPin.P14, power)
                pins.analogWritePin(AnalogPin.P15, power)
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
            case 3:
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.analogWritePin(AnalogPin.P14, power)
                pins.digitalWritePin(DigitalPin.P15, 0)
                pins.analogWritePin(AnalogPin.P16, power)
                break
            case 4:
                pins.analogWritePin(AnalogPin.P13, power)
                pins.digitalWritePin(DigitalPin.P14, 0)
                pins.analogWritePin(AnalogPin.P15, power)
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
        }
    }

    /**
    * 停止 Jet Mole
    * stop the Jet Mole
    */
    //% blockId="stop" block="Jet Mole stop"
    //% weight=90
    export function stop(): void {
            pins.analogWritePin(AnalogPin.P13, 0)
            pins.digitalWritePin(DigitalPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, 0)
    }

    /**
    * 移動 Jet Mole 單一鑽頭
    * rotate single drill
    */
    //% blockId="motorRotate" block="rotate %myMotor drill | %myDir | speed(0~1023) %power"
    //% power.min=0 power.max=1023 weight=85
    export function motorRotate(myMotor: motor, myDir: rotateDir, power: number): void {
        if (power < 0)
            power = 0
        else if (power > stopValue)
            power = stopValue
        switch (myMotor) {
            case 1:
                if (myDir==1){
                    pins.analogWritePin(AnalogPin.P16, power)
                    pins.digitalWritePin(DigitalPin.P15, 0)
                } else if (myDir==2){
                    pins.analogWritePin(AnalogPin.P15, power)
                    pins.digitalWritePin(DigitalPin.P16, 0)
                }
                break
            case 2:
                if (myDir==1){
                    pins.analogWritePin(AnalogPin.P13, power)
                    pins.digitalWritePin(DigitalPin.P14, 0)
                } else if (myDir==2){
                    pins.analogWritePin(AnalogPin.P14, power)
                    pins.digitalWritePin(DigitalPin.P13, 0)
                }
                break
        }
    }

    /**
    * 停止單一鑽頭
    * stop single drill
    */
    //% blockId="stopSingleMotor" block="stop %myMotor drill"
    //% weight=80
    export function stopSingleMotor(myMotor: motor): void {
        let motorPin = AnalogPin.P14
        let dirPin = DigitalPin.P16
        switch (myMotor) {
            case 1:
                pins.digitalWritePin(DigitalPin.P15, 0)
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
            case 2:
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.digitalWritePin(DigitalPin.P14, 0)
                break
        }
    }

} 