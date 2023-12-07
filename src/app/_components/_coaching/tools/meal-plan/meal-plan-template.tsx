import { Page, View, Document, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { showDecimalIfNotZero } from "~/app/_lib/utils";
import { MealPlanMeal } from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";

const styles = StyleSheet.create({
  mt24: {
    marginTop: 32,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  body: {
    paddingVertical: 24,
  },
  header: {
    fontSize: 24,
    paddingHorizontal: 12,
    fontFamily: "Helvetica-Bold",
  },
  meal: {
    borderTop: "1px solid #E5E7EB",
    backgroundColor: "#F1F5F9",
    paddingVertical: 12,
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  mealName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
  },

  macroName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  macroAmount: {
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  mealTotalWrapper: {
    display: "flex",
  },
  mealFoodsHeaderWrapper: {
    borderBottom: "1px solid #E5E7EB",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  mealFoodsHeader: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  foodNameSize: {
    width: "25%",
  },
  macroSize: {
    width: "15%",
  },
  mealFoodsRowWrapper: {
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mealFoodRowData: {
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  totalMacroWrapper: {
    fontSize: 12,
    backgroundColor: "#F1F5F9",
    width: 100,
    height: 100,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 99,
  },

  totalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  totalHeader: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 20,
  },
});

const MealPlanTemplate: React.FC<{
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalKcal: number;
  meals: MealPlanMeal[];
}> = ({ totalCarbs, totalFat, totalKcal, totalProtein, meals }) => {
  return (
    <Document>
      <Page size={"A4"} style={styles.body}>
        <Text style={styles.header}>Kostschema</Text>

        {meals.length > 0 &&
          meals.map((meal) => (
            <React.Fragment key={meal.id}>
              <View style={[styles.meal, styles.mt24]}>
                <Text style={styles.mealName}>{meal.name}</Text>

                <View style={styles.mealTotalWrapper}>
                  <Text style={styles.macroName}>Kalorier</Text>
                  <Text style={styles.macroAmount}>
                    {showDecimalIfNotZero(
                      meal.foods.reduce(
                        (acc, food) => (acc += food.calculatedKcal),
                        0,
                      ),
                    )}
                  </Text>
                </View>

                <View style={styles.mealTotalWrapper}>
                  <Text style={styles.macroName}>Protein</Text>
                  <Text style={styles.macroAmount}>
                    {showDecimalIfNotZero(
                      meal.foods.reduce(
                        (acc, food) => (acc += food.calculatedProtein),
                        0,
                      ),
                    )}{" "}
                    g
                  </Text>
                </View>

                <View style={styles.mealTotalWrapper}>
                  <Text style={styles.macroName}>Fett</Text>
                  <Text style={styles.macroAmount}>
                    {showDecimalIfNotZero(
                      meal.foods.reduce(
                        (acc, food) => (acc += food.calculatedFat),
                        0,
                      ),
                    )}{" "}
                    g
                  </Text>
                </View>

                <View style={styles.mealTotalWrapper}>
                  <Text style={styles.macroName}>Kolhydrater</Text>
                  <Text style={styles.macroAmount}>
                    {showDecimalIfNotZero(
                      meal.foods.reduce(
                        (acc, food) => (acc += food.calculatedCarbs),
                        0,
                      ),
                    )}{" "}
                    g
                  </Text>
                </View>
              </View>

              <View style={styles.mealFoodsHeaderWrapper}>
                <Text style={[styles.mealFoodsHeader, styles.foodNameSize]}>
                  NAMN
                </Text>
                <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                  MÄNGD
                </Text>
                <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                  KALORIER
                </Text>
                <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                  PROTEIN
                </Text>
                <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                  FETT
                </Text>
                <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                  KOLHYDRATER
                </Text>
              </View>

              {meal.foods.length > 0 &&
                meal.foods.map((food) => (
                  <View style={styles.mealFoodsRowWrapper} key={food.id}>
                    <Text style={[styles.mealFoodRowData, styles.foodNameSize]}>
                      {food.name}
                    </Text>

                    <Text style={[styles.mealFoodRowData, styles.macroSize]}>
                      {showDecimalIfNotZero(food.amount)}{" "}
                      {food.unit !== "unit" ? food.unit : "st"}
                    </Text>
                    <Text style={[styles.mealFoodRowData, styles.macroSize]}>
                      {showDecimalIfNotZero(food.calculatedKcal)} g
                    </Text>
                    <Text style={[styles.mealFoodRowData, styles.macroSize]}>
                      {showDecimalIfNotZero(food.calculatedProtein)} g
                    </Text>
                    <Text style={[styles.mealFoodRowData, styles.macroSize]}>
                      {showDecimalIfNotZero(food.calculatedFat)} g
                    </Text>
                    <Text style={[styles.mealFoodRowData, styles.macroSize]}>
                      {showDecimalIfNotZero(food.calculatedCarbs)} g
                    </Text>
                  </View>
                ))}
            </React.Fragment>
          ))}

        <Text style={[styles.totalHeader, styles.mt24]}>Totalt</Text>

        <View style={styles.totalContainer}>
          <View style={styles.totalMacroWrapper}>
            <Text style={styles.bold}>Protein</Text>
            <Text>{totalProtein} g</Text>
          </View>

          <View style={styles.totalMacroWrapper}>
            <Text style={styles.bold}>Kolhydrater</Text>
            <Text>{totalCarbs} g</Text>
          </View>

          <View style={styles.totalMacroWrapper}>
            <Text style={styles.bold}>Fett</Text>
            <Text>{totalFat} g</Text>
          </View>

          <View style={styles.totalMacroWrapper}>
            <Text style={styles.bold}>Kalorier</Text>
            <Text>{totalKcal}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MealPlanTemplate;
