/*
 *  Copyright 2015 Will Dimmit <will@ultimatetrip.net>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
 /* Inspired by "bargraph.js" by William Malone (www.williammalone.com) */
 
exports.chart = function() {
 	var width = 320;
 	var height = 240;
 	var dataMax = 0.6;
 	var dataMin = 0;
 	var options;
 	var currentData;
 	
 	this.BarGraph = function(ctx, options) {
		this.options = options;
		
		this.draw = function(data) {
			this.currentData = data;
			
			var barCount = data.length;
			var barWidth;
			var barHeight;
			var maxBarHeight = height;
			var marginWidth;
			
			/*Draw the background*/
			if (typeof(options.background) != 'undefined' )
				ctx.fillStyle = options.background;
			else
				ctx.fillStyle = '#ffffff';
			ctx.fillRect(0,0,width,height);
			
			if (typeof(options.marginWidth) != 'undefined' )
				marginWidth = options.marginWidth;
			else
				marginWidth = 0;
			
			/*Bar Dimensions*/
			barWidth = (width / barCount) - (marginWidth * 2);
			
			/*Draw the Bars*/
			for (i = 0; i < data.length; i++) {
				
				var ratio = (data[i] - dataMin) / dataMax;
				barHeight = ratio * maxBarHeight;
				
				if (barHeight > 0) {
					if (typeof(options.background) != 'undefined' ) 
						ctx.fillStyle = options.primaryColor;
					else
						ctx.fillStyle = '#ff0000';				
					
					ctx.fillRect(marginWidth + i * width / barCount,
							  height - barHeight, barWidth, barHeight);
				}						
			}
		}
		
		this.refresh = function(data) {
			if (currentData != data)
				this.draw(data);
			else
				return;
		}
	}
 	this.FastBarGraph = function(options) {
		this.options = options;
		this.draw = function(port, data) {
			this.currentData = data;
			//debugger;
			var barCount = data.length;
			var barWidth;
			var barHeight;
			var maxBarHeight = height;
			var marginWidth;
			var fillColor;
			var backgroundColor;
			
			/*Draw the background*/
			if (typeof(options.background) != 'undefined' )
				backgroundColor = options.background;
			else
				backgroundColor = '#ffffff';
			port.fillColor(backgroundColor,0,0,width,height);
			
			if (typeof(options.marginWidth) != 'undefined' )
				marginWidth = options.marginWidth;
			else
				marginWidth = 0;
			
			/*Bar Dimensions*/
			barWidth = (width / barCount) - (marginWidth * 2);
			
			/*Draw the Bars*/
			for (i = 0; i < data.length; i++) {
				
				var ratio = (data[i] - dataMin) / dataMax;
				barHeight = ratio * maxBarHeight;
				
				if (barHeight > 0) {
					if (typeof(options.primaryColor) != 'undefined' ) 
						fillColor = options.primaryColor;
					else
						fillColor = '#ff0000';				
					
					port.fillColor(fillColor, marginWidth + i * width / barCount,
							  height - barHeight, barWidth, barHeight);
				}						
			}
		}
		
		this.refresh = function(port, data) {
			if (currentData != data)
				this.draw(port, data);
			else
				return;
		}
	}
 
}