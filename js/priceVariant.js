/**
 * 
 */
var priceVariant = (function(){
	var variantCombinationList = [],
	 	variantAttrValuesList = [],
	 	activeVariantItems = [],
		variantVariations = {};
	
	var $priceContainer = null,
 		$variantPrice = null,
		$variantsContainer = null,
		$variantItems = null;
	
	var init = function(){
		$variantsContainer = $(".variant");
		$variantItems = $variantsContainer.find(".variantItem");
		
		var $variantGSMType = $variantsContainer.find(".gsm .variantItem");
		var $variantHandleType = $variantsContainer.find(".handletype .variantItem");
		var $variantPaperType = $variantsContainer.find(".papertype .variantItem");
		var $variantSizeType = $variantsContainer.find(".size .variantItem");
		var $variantColorType = $variantsContainer.find(".colour .variantItem");

		var $activeGSMType = $variantsContainer.find(".gsm .variantItem.active");
		var activeGMSCode = $activeGSMType.attr("data-value");
		variantCombinationList.push(activeGMSCode);
		
		var $activeHandleType = $variantsContainer.find(".handletype .variantItem.active");
		var activeHandleCode = $activeHandleType.attr("data-value");
		variantCombinationList.push(activeHandleCode);
		
		var $activePaperType = $variantsContainer.find(".papertype .variantItem.active");
		var activePaperCode = $activePaperType.attr("data-value");
		variantCombinationList.push(activePaperCode);
		
		var $activeSizeType = $variantsContainer.find(".size .variantItem.active");
		var activeSizeCode = $activeSizeType.attr("data-value");
		variantCombinationList.push(activeSizeCode);
		
		var $activeColorType = $variantsContainer.find(".colour .variantItem.active");
		var activeColorCode = $activeColorType.attr("data-value");
		variantCombinationList.push(activeColorCode);
		
		$priceContainer = $(".priceContainer");
		$variantPrice = $priceContainer.find(".variantPrice");
		
		$variantItems.each(function(index,ele){
			variantAttrValuesList.push($(ele).attr("data-attribute-value"));
		})
		
		//initialize on page load
		//unavailalbeVariant($activeGSMType);
		
		$variantGSMType.on("click", function(){
			var $selectedItm = $(this);
			if($selectedItm.hasClass("inactive")){
				return;
			}
			$activeGSMType = $variantsContainer.find(".gsm .variantItem.active");
			activateVariantItems($activeGSMType, $selectedItm, 0, 1);
			//console.log("This is from init Method click gsm: " + variantVariations[$(this).attr("data-attribute-value")]);
		});
		$variantHandleType.on("click", function(){
			var $selectedItm = $(this);
			if($selectedItm.hasClass("inactive")){
				return;
			}
			$activeHandleType = $variantsContainer.find(".handletype .variantItem.active");
			activateVariantItems($activeHandleType, $selectedItm, 1, 1);
			//console.log("This is from init Method click handle type: " + variantVariations[$(this).attr("data-attribute-value")]);
		});
		$variantPaperType.on("click", function(){
			var $selectedItm = $(this);
			if($selectedItm.hasClass("inactive")){
				return;
			}
			$activePaperType = $variantsContainer.find(".papertype .variantItem.active");
			activateVariantItems($activePaperType, $selectedItm, 2, 1);
		});
		$variantSizeType.on("click", function(){
			var $selectedItm = $(this);
			if($selectedItm.hasClass("inactive")){
				return;
			}
			$activeSizeType = $variantsContainer.find(".size .variantItem.active");
			activateVariantItems($activeSizeType, $selectedItm, 3, 1);
		});
		$variantColorType.on("click", function(){
			var $selectedItm = $(this);
			if($selectedItm.hasClass("inactive")){
				return;
			}
			$activeColorType = $variantsContainer.find(".colour .variantItem.active");
			activateVariantItems($activeColorType, $selectedItm, 4, 1);
		});
	};
	
	var activateVariantItems = function($activeItem, $ItemToactivate, indexPos, deletPos){
		if(!$ItemToactivate.hasClass("active")){
			$ItemToactivate.addClass("active");
			$activeItem.removeClass("active");
			variantCombinationList.splice(indexPos,deletPos,$ItemToactivate.attr("data-value"));
			console.log("variantCombinationList" + variantCombinationList);
			changePrice();
		} else {
			$ItemToactivate.removeClass("active");
		}
		activeVariantItems = $variantsContainer.find(".variantItem.active"); 
		unavailalbeVariant($ItemToactivate);
	};
	
	var unavailalbeVariant = function(activeVariantItems) {
		
//		var selectedVariantItem = $selectedVariant.attr("data-attribute-value");
//		var selectedVariantType = $selectedVariant.attr("data-attribute-type");
		var listOfVaritans = [];
		
		$variantPrice.each(function(ind,e){
			/*var variantValuesList = JSON.parse($(e).attr("data-attribute-values"));
			if(variantValuesList.includes(parseInt(selectedVariantItem))){
				variantVariations[selectedVariantItem] = variantVariations[selectedVariantItem].concat(variantValuesList);
			}*/
			var dataFormat = '["'+$(e).attr("data-format")+'"]';
				dataFormat = dataFormat.replace(/#"]/g, '"]');
				dataFormat = dataFormat.replace(/#/g, '","');
			var variantValuesMap = JSON.parse(dataFormat);
			listOfVaritans.push(JSON.parse(dataFormat))
		})
			
		var $activeVariantItems = $variantsContainer.find(".variantItem.active");
		var activeVariantItemList = [];
//		$activeVariantItems.each(function(ind,e){
//			$activeVariantItemList
//		});
		
		$activeVariantItems.each(function(ind,e){
			var activeItem = $(e).attr("data-value");
			var subArry = activeVariantItemList.length > 0 ? activeVariantItemList : listOfVaritans;
			subArry.forEach(function(ele) {
				if(ele.includes(activeItem)){
					activeVariantItemList.push(ele);
				}
			})
		});
		
		//variantVariations[selectedVariantItem] = [];
		
		
		
		
		variantVariations[selectedVariantItem] = utility.removeDuplicateFromArr(variantVariations[selectedVariantItem]);
		var itemIndex = variantVariations[selectedVariantItem].indexOf(parseInt(selectedVariantItem));
		if(itemIndex > -1){
			variantVariations[selectedVariantItem].splice(itemIndex,1);
		}
		console.log("This is from unavailalbeVariant Method : " + variantVariations[selectedVariantItem]);
		console.log("selectedVariantItem : " + selectedVariantItem);
		
		$variantItems.each(function(i,ele){
			var $ele = $(ele)
			var itm = $ele.attr("data-attribute-value");
			if(($ele.hasClass("inactive")) && (selectedVariantType !=  $ele.attr("data-attribute-type"))) {
				$ele.removeClass("inactive");
			}
			
			if(!variantVariations[selectedVariantItem].includes(parseInt(itm)) && 
					selectedVariantType !=  $ele.attr("data-attribute-type") &&
					$selectedVariant.hasClass("active")){
				console.log("itm : " + itm);
				var $nonMapVariant = $variantsContainer.find('li[data-attribute-value="'+itm+'"]');
				if($nonMapVariant.hasClass("active")) {
					$nonMapVariant.removeClass("active");
				}
				$nonMapVariant.addClass("inactive");
			}
		});
	};
	
	var changePrice = function() {
		var $activeVariantPrice = $priceContainer.find(".variantPrice.active");
		var $variantSku = $priceContainer.find(".variantSku");
		var $activeVariantSku = $priceContainer.find(".variantSku.active");
		var variantCombination = variantCombinationList.toString();
		console.log("variantCombination" + variantCombination);
		var variantCombination = variantCombination.replace(/,/g,"#")+"#";
		console.log("variantCombination" + variantCombination);
		var $selectedVariantCombination = $priceContainer.find('span[data-format="'+variantCombination+'"]')
		$selectedVariantCombination.each(function(i,selectedVariant){
			var $selectedVariant = $(selectedVariant);
			if(!$selectedVariant.hasClass("active") && $selectedVariant.hasClass("variantPrice")){
				$selectedVariant.addClass("active");
				$activeVariantPrice.removeClass("active");
			} else {
				if(!$selectedVariant.hasClass("active")){
					$selectedVariant.addClass("active");
					$activeVariantSku.removeClass("active");
				}
			}
		})
	};
	return {
		init:init
	}
})();

$(document).ready(function(){
	priceVariant.init();
});