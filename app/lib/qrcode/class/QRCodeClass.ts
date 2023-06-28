import QRBitBuffer from "./QRBuffer";
import QRRSBlock from "./QRRSBlock";

export class QR8bitByte {
	mode: number;
	data: string;
	constructor(data: string){		
    this.mode = QRMode.MODE_8BIT_BYTE;
	  this.data = data;
  }

	getLength(_buffer: any): number {
		return this.data.length;
	}
	
	write(buffer: { put: (arg0: any, arg1: number) => void; }): void {
		for (let i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
}



//---------------------------------------------------------------------
// QRCode 保存QR码数据矩阵
//---------------------------------------------------------------------

export default class QRCode{
	static PAD0 = 0xEC;
	static PAD1 = 0x11;
	typeNumber: number;
	errorCorrectLevel: any;
	modules: (boolean | null)[][] = [];
	moduleCount: number;
	dataCache: null;
	dataList: any[];

	constructor(typeNumber: number, errorCorrectLevel: number) {
		//静态信息
		this.typeNumber = typeNumber;
		this.errorCorrectLevel = errorCorrectLevel;
	
		//初始化数据
		this.moduleCount = 0;
		this.dataCache = null;
		this.dataList = new Array();
  }
  
	static createData (typeNumber: number, errorCorrectLevel, dataList) {
	
		const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
		
		let buffer = new QRBitBuffer();
		
		for (let i = 0; i < dataList.length; i++) {
			let data = dataList[i];
			buffer.put(data.mode, 4);
			buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
			data.write(buffer);
		}
	
		// calc num max data.
		let totalDataCount = 0;
		for (let i = 0; i < rsBlocks.length; i++) {
			totalDataCount += rsBlocks[i].dataCount;
		}
	
		if (buffer.getLengthInBits() > totalDataCount * 8) {
			throw new Error("code length overflow. ("
				+ buffer.getLengthInBits()
				+ ">"
				+  totalDataCount * 8
				+ ")");
		}
	
		// end code
		if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
			buffer.put(0, 4);
		}
	
		// padding
		while (buffer.getLengthInBits() % 8 != 0) {
			buffer.putBit(false);
		}
	
		// padding
		while (true) {
			if (buffer.getLengthInBits() >= totalDataCount * 8) {
				break;
			}
			buffer.put(QRCode.PAD0, 8);
			
			if (buffer.getLengthInBits() >= totalDataCount * 8) {
				break;
			}
			buffer.put(QRCode.PAD1, 8);
		}
	
		return this.createBytes(buffer, rsBlocks);
	}
	
	addData(data: string) {
		
		let newData = new QR8bitByte(data);
		this.dataList.push(newData);
		this.dataCache = null;
	}
	/**
	 * Return the module value
	 */
	isDark(row: number, col: number) {
		//Check the argment is valid
		if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
			throw new Error(row + "," + col);
		}
		return this.modules[row][col];
	}

	getModuleCount() {
		return this.moduleCount;
	}
	
	make() {
		this.makeImpl(false, this.getBestMaskPattern() );
	}
	
	makeImpl (test: boolean, maskPattern: number) {
		
		this.moduleCount = this.typeNumber * 4 + 17;
		this.modules = new Array(this.moduleCount);
		
		for (let row = 0; row < this.moduleCount; row++) {
			
			this.modules[row] = new Array(this.moduleCount);
			
			for (let col = 0; col < this.moduleCount; col++) {
				this.modules[row][col] = null;//(col + row) % 3;
			}
		}
		//设置定向标志
		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this.moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this.moduleCount - 7);
		
    
		this.setupPositionAdjustPattern();
		//校准(Timing)标志
		this.setupTimingPattern();
		this.setupTypeInfo(test, maskPattern);
		//版本大于7时需要设置
		if (this.typeNumber >= 7) {
			this.setupTypeNumber(test);
		}
	
		if (this.dataCache == null) {
			this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
		}
		//掩模和数据进行运算
		this.mapData(this.dataCache, maskPattern);
	}

	

	setupPositionProbePattern(row: number, col: number){
		
		for (let r = -1; r <= 7; r++) {
			if (row + r <= -1 || this.moduleCount <= row + r) 
			  continue;	
			for (let c = -1; c <= 7; c++) {
				if (col + c <= -1 || this.moduleCount <= col + c) 
				  continue;
				if (
          (0 <= r && r <= 6 && (c == 0 || c == 6)) ||
          (0 <= c && c <= 6 && (r == 0 || r == 6)) ||
          (2 <= r && r <= 4 && 2 <= c && c <= 4)
        ) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
			}		
		}		
	}
	
 /**
  * Description
	* Get the best mask pattern for this qrcode
  * @returns {number}
  */
	getBestMaskPattern () {
	
		let minLostPoint = 0;
		let pattern = 0;
	
		for (let i = 0; i < 8; i++) {
			
			this.makeImpl(true, i);
	
			let lostPoint = QRUtil.getLostPoint(this);
	
			if (i == 0 || minLostPoint >  lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}
	
		return pattern;
	}
	/**
	 * Draw the square according to the matrix value 
	 * @param target_mc 
	 * @param instance_name 
	 * @param depth 
	 * @returns 
	 */
	createMovieClip (target_mc: { createEmptyMovieClip: (arg0: any, arg1: any) => any; }, instance_name: any, depth: any) {

		let qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
		let cs = 1;
	
		this.make();

		for (let row = 0; row < this.modules.length; row++) {	
			let y = row * cs;
			for (let col = 0; col < this.modules[row].length; col++) {
	
				let x = col * cs;
				let dark = this.modules[row][col];
			
				if (dark) {
					qr_mc.beginFill(0, 100);
					qr_mc.moveTo(x, y);
					qr_mc.lineTo(x + cs, y);
					qr_mc.lineTo(x + cs, y + cs);
					qr_mc.lineTo(x, y + cs);
					qr_mc.endFill();
				}
			}
		}
		
		return qr_mc;
	}

	//计算时间标志
	setupTimingPattern () {
		
		for (let r = 8; r < this.moduleCount - 8; r++) {
			if (this.modules[r][6] != null) {
				continue;
			}
			this.modules[r][6] = (r % 2 == 0);
		}
	
		for (let c = 8; c < this.moduleCount - 8; c++) {
			if (this.modules[6][c] != null) {
				continue;
			}
			this.modules[6][c] = (c % 2 == 0);
		}
	}
	
	//校正标志
	setupPositionAdjustPattern () {
	
		let pos = QRUtil.getPatternPosition(this.typeNumber);
		
		for (let i = 0; i < pos.length; i++) {
		
			for (let j = 0; j < pos.length; j++) {
			
				let row = pos[i];
				let col = pos[j];
				
				if (this.modules[row][col] != null) {
					continue;
				}
				
				for (let r = -2; r <= 2; r++) {
				
					for (let c = -2; c <= 2; c++) {
					
						if (r == -2 || r == 2 || c == -2 || c == 2 
								|| (r == 0 && c == 0) ) {
							this.modules[row + r][col + c] = true;
						} else {
							this.modules[row + r][col + c] = false;
						}
					}
				}
			}
		}
	}
	
	setupTypeNumber (test: boolean) {
	
		let bits = QRUtil.getBCHTypeNumber(this.typeNumber);
	
		for (let i = 0; i < 18; i++) {
			let mod = (!test && ( (bits >> i) & 1) == 1);
			this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
		}
	
		for (let i = 0; i < 18; i++) {
			let mod = (!test && ( (bits >> i) & 1) == 1);
			this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
		}
	}
	
	setupTypeInfo (test: boolean, maskPattern: number) {
	
		const data = (this.errorCorrectLevel << 3) | maskPattern;
		const bits = QRUtil.getBCHTypeInfo(data);
	
		// vertical		
		for (let i = 0; i < 15; i++) {
	
			let mod = (!test && ( (bits >> i) & 1) == 1);
	
			if (i < 6) {
				this.modules[i][8] = mod;
			} else if (i < 8) {
				this.modules[i + 1][8] = mod;
			} else {
				this.modules[this.moduleCount - 15 + i][8] = mod;
			}
		}
	
		// horizontal
		for (let i = 0; i < 15; i++) {
	
			let mod = (!test && ( (bits >> i) & 1) == 1);
			
			if (i < 8) {
				this.modules[8][this.moduleCount - i - 1] = mod;
			} else if (i < 9) {
				this.modules[8][15 - i - 1 + 1] = mod;
			} else {
				this.modules[8][15 - i - 1] = mod;
			}
		}
	
		// fixed module
		this.modules[this.moduleCount - 8][8] = (!test);
	
	}

	
	mapData (data: string[], maskPattern: any) {
		
		let inc = -1;
		let row = this.moduleCount - 1;
		let bitIndex = 7;
		let byteIndex = 0;
		
		for (let col = this.moduleCount - 1; col > 0; col -= 2) {
	
			if (col == 6) col--;
	
			while (true) {
	
				for (let c = 0; c < 2; c++) {
					
					if (this.modules[row][col - c] == null) {
						
						let dark = false;
	
						if (byteIndex < data.length) {
							dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
						}
	
						let mask = QRUtil.getMask(maskPattern, row, col - c);
	
						if (mask) {
							dark = !dark;
						}
						
						this.modules[row][col - c] = dark;
						bitIndex--;
	
						if (bitIndex == -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}
								
				row += inc;
	
				if (row < 0 || this.moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
		
	}
}








//---------------------------------------------------------------------
// QRMode 二维码的模式
//---------------------------------------------------------------------

let QRMode = {
	MODE_NUMBER :		1 << 0,
	MODE_ALPHA_NUM : 	1 << 1,
	MODE_8BIT_BYTE : 	1 << 2,
	MODE_KANJI :		1 << 3
};

//---------------------------------------------------------------------
// QRErrorCorrectLevel
//---------------------------------------------------------------------
 
export const QRErrorCorrectLevel = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};

//---------------------------------------------------------------------
// QRMaskPattern
//---------------------------------------------------------------------
//TODO const enum
enum QRMaskPattern{
	PATTERN000 = 0,
	PATTERN001 = 1,
	PATTERN010 = 2,
	PATTERN011 = 3,
	PATTERN100 = 4,
	PATTERN101 = 5,
	PATTERN110 = 6,
	PATTERN111 = 7
};

//---------------------------------------------------------------------
// QRUtil
//---------------------------------------------------------------------
 
const QRUtil = {
    PATTERN_POSITION_TABLE : [
	    [],
	    [6, 18],
	    [6, 22],
	    [6, 26],
	    [6, 30],
	    [6, 34],
	    [6, 22, 38],
	    [6, 24, 42],
	    [6, 26, 46],
	    [6, 28, 50],
	    [6, 30, 54],		
	    [6, 32, 58],
	    [6, 34, 62],
	    [6, 26, 46, 66],
	    [6, 26, 48, 70],
	    [6, 26, 50, 74],
	    [6, 30, 54, 78],
	    [6, 30, 56, 82],
	    [6, 30, 58, 86],
	    [6, 34, 62, 90],
	    [6, 28, 50, 72, 94],
	    [6, 26, 50, 74, 98],
	    [6, 30, 54, 78, 102],
	    [6, 28, 54, 80, 106],
	    [6, 32, 58, 84, 110],
	    [6, 30, 58, 86, 114],
	    [6, 34, 62, 90, 118],
	    [6, 26, 50, 74, 98, 122],
	    [6, 30, 54, 78, 102, 126],
	    [6, 26, 52, 78, 104, 130],
	    [6, 30, 56, 82, 108, 134],
	    [6, 34, 60, 86, 112, 138],
	    [6, 30, 58, 86, 114, 142],
	    [6, 34, 62, 90, 118, 146],
	    [6, 30, 54, 78, 102, 126, 150],
	    [6, 24, 50, 76, 102, 128, 154],
	    [6, 28, 54, 80, 106, 132, 158],
	    [6, 32, 58, 84, 110, 136, 162],
	    [6, 26, 54, 82, 110, 138, 166],
	    [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1),

    getBCHTypeInfo (data: number) {
	    let d = data << 10;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
		    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) ); 	
	    }
	    return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber (data: number) {
	    let d = data << 12;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
		    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) ); 	
	    }
	    return (data << 12) | d;
    },

    getBCHDigit (data: number) {

	    let digit = 0;

	    while (data != 0) {
		    digit++;
		    data >>>= 1;
	    }

	    return digit;
    },

    getPatternPosition (typeNumber: number) {
	    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask (maskPattern: number, i: number, j: number) {
	    
	    switch (maskPattern) {
		    
				case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
				case QRMaskPattern.PATTERN001 : return i % 2 == 0;
				case QRMaskPattern.PATTERN010 : return j % 3 == 0;
				case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
				case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
				case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
				case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
				case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

				default :
					throw new Error("Bad maskPattern:" + maskPattern);
				}
    },

    getErrorCorrectPolynomial (errorCorrectLength: number) {

	    let a = new QRPolynomial([1], 0);

	    for (let i = 0; i < errorCorrectLength; i++) {
		    a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
	    }

	    return a;
    },
		
    getLengthInBits (mode: number, type: number) {
	    if (1 <= type && type < 10) {
		    // 1 - 9
		    switch(mode) {
					case QRMode.MODE_NUMBER 	: return 10;
					case QRMode.MODE_ALPHA_NUM 	: return 9;
					case QRMode.MODE_8BIT_BYTE	: return 8;
					case QRMode.MODE_KANJI  	: return 8;
		      default :
			      throw new Error("mode:" + mode);
		    }

	    } else if (type < 27) {

		    // 10 - 26

		    switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);
        }

	    } else if (type < 41) {

		    // 27 - 40

		    switch(mode) {
		    case QRMode.MODE_NUMBER 	: return 14;
		    case QRMode.MODE_ALPHA_NUM	: return 13;
		    case QRMode.MODE_8BIT_BYTE	: return 16;
		    case QRMode.MODE_KANJI  	: return 12;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else {
		    throw new Error("type:" + type);
	    }
    },

    getLostPoint (qrcode: QRCode): number {
	    
	    let moduleCount = qrcode.getModuleCount();
	    
	    let lostPoint = 0;
	    
	    // LEVEL1
	    
	    for (let row = 0; row < moduleCount; row++) {

		    for (let col = 0; col < moduleCount; col++) {

			    let sameCount = 0;
			    let dark = qrcode.isDark(row, col);

				for (let r = -1; r <= 1; r++) {

				    if (row + r < 0 || moduleCount <= row + r) {
					    continue;
				    }

				    for (let c = -1; c <= 1; c++) {

					    if (col + c < 0 || moduleCount <= col + c) {
						    continue;
					    }

					    if (r == 0 && c == 0) {
						    continue;
					    }

					    if (dark == qrcode.isDark(row + r, col + c) ) {
						    sameCount++;
					    }
				    }
			    }

			    if (sameCount > 5) {
				    lostPoint += (3 + sameCount - 5);
			    }
		    }
	    }

	    // LEVEL2

	    for (let row = 0; row < moduleCount - 1; row++) {
		    for (let col = 0; col < moduleCount - 1; col++) {
			    let count = 0;
			    if (qrcode.isDark(row,     col    ) ) count++;
			    if (qrcode.isDark(row + 1, col    ) ) count++;
			    if (qrcode.isDark(row,     col + 1) ) count++;
			    if (qrcode.isDark(row + 1, col + 1) ) count++;
			    if (count == 0 || count == 4) {
				    lostPoint += 3;
			    }
		    }
	    }

	    // LEVEL3

	    for (let row = 0; row < moduleCount; row++) {
		    for (let col = 0; col < moduleCount - 6; col++) {
			    if (qrcode.isDark(row, col)
					    && !qrcode.isDark(row, col + 1)
					    &&  qrcode.isDark(row, col + 2)
					    &&  qrcode.isDark(row, col + 3)
					    &&  qrcode.isDark(row, col + 4)
					    && !qrcode.isDark(row, col + 5)
					    &&  qrcode.isDark(row, col + 6) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    for (let col = 0; col < moduleCount; col++) {
		    for (let row = 0; row < moduleCount - 6; row++) {
			    if (qrcode.isDark(row, col)
					    && !qrcode.isDark(row + 1, col)
					    &&  qrcode.isDark(row + 2, col)
					    &&  qrcode.isDark(row + 3, col)
					    &&  qrcode.isDark(row + 4, col)
					    && !qrcode.isDark(row + 5, col)
					    &&  qrcode.isDark(row + 6, col) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    // LEVEL4
	    
	    let darkCount = 0;

	    for (let col = 0; col < moduleCount; col++) {
		    for (let row = 0; row < moduleCount; row++) {
			    if (qrcode.isDark(row, col) ) {
				    darkCount++;
			    }
		    }
	    }
	    
	    let ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
	    lostPoint += ratio * 10;

	    return lostPoint;		
    }

};


//---------------------------------------------------------------------
// QRMath
//---------------------------------------------------------------------

const QRMath = {
  //Return log value at n index
	glog (n: number) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp (n: number) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (let i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (let i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] =
    QRMath.EXP_TABLE[i - 4] ^
    QRMath.EXP_TABLE[i - 5] ^
    QRMath.EXP_TABLE[i - 6] ^
    QRMath.EXP_TABLE[i - 8];
}
for (let i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}
console.log("EXP-TABLE",QRMath.EXP_TABLE)
console.log(QRMath.EXP_TABLE)
console.log(QRMath.LOG_TABLE)
//---------------------------------------------------------------------
// QRPolynomial
//---------------------------------------------------------------------

class QRPolynomial {
	
	nums: number[];
	
  constructor(nums: number[], shift:  number){
		if (nums.length === undefined) {
			throw new Error(nums.length + "/" + shift);
		}
		let offset = 0;

		while (offset < nums.length && nums[offset] === 0) {
			offset++;
		}
	
		this.nums = new Array(nums.length - offset + shift);
		for (let i = 0; i < nums.length - offset; i++) {
			this.nums[i] = nums[i + offset];
		}
  }
	get(index: number) {
		return this.nums[index];
	}
	
 /**
  * Get the length of the string
  * @returns {number}
  */
	getLength () {
		return this.nums.length;
	}
	
	multiply (e: QRPolynomial) {
	
		let num = new Array(this.getLength() + e.getLength() - 1);
	
		for (let i = 0; i < this.getLength(); i++) {
			for (let j = 0; j < e.getLength(); j++) {
				num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	}
	
	mod (e: QRPolynomial) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		let ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );
	
		let num = new Array(this.getLength() );
		
		for (let i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (let i = 0; i < e.getLength(); i++) {
			num[i] ^= QRMath.gexp(QRMath.glog(e.get(i) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}


}












