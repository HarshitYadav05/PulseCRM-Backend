import Lead from "../models/Lead.js";
import Customer from "../models/Customer.js";

export const getDashboardData = async (req, res) => {
  try {
    console.log("📊 Dashboard request received for user:", req.user._id);

    // Use 'createdBy' instead of 'user' since that's what's in your DB
    const leads = await Lead.find({ createdBy: req.user._id });
    const customers = await Customer.find({ createdBy: req.user._id });

    console.log("🟢 Leads fetched for user:", req.user._id, "Count:", leads.length);
    console.log("🟣 Customers fetched for user:", req.user._id, "Count:", customers.length);

    const totalLeads = leads.length;
    const totalCustomers = customers.length;

    const conversionRate =
      totalLeads > 0 ? ((totalCustomers / totalLeads) * 100).toFixed(1) : 0;

    const leadStats = ["New", "Contacted", "Qualified", "Lost", "Converted"].map(
      (status) => ({
        status,
        count: leads.filter((lead) => lead.status === status).length,
      })
    );

    const customerStats = customers.reduce((acc, c) => {
      const firstLetter = c.name ? c.name.charAt(0).toUpperCase() : "N/A";
      const existing = acc.find((x) => x.name === firstLetter);
      if (existing) existing.value += 1;
      else acc.push({ name: firstLetter, value: 1 });
      return acc;
    }, []);

    const summary = {
      totalLeads,
      totalCustomers,
      conversionRate,
    };

    console.log("📦 Dashboard summary:", summary);

    res.status(200).json({
      success: true,
      ...summary,
      leadStats,
      customerStats,
    });
  } catch (error) {
    console.error("❌ Dashboard Controller Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
